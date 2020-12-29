let superagent = require('superagent');
// let formatJson = require('format-json-pretty');
let colorize = require('json-colorizer');
var exec = require('child_process').exec;
const ora = require('ora');

// Not so good
// let formatJson = require('format-json-pretty');

// Good
// let formatJson = require('json-format');

// Best!!!
let formatJson = require('format-json').diffy;

async function getUrlContent(url) {
  try {
    let res = await superagent.get(url);
    return res;
  } catch (err) {
    console.error(err);
  }
  return;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function getRepoLatestVersion(repoName) {
    const baseUrl = "https://component-browser.devops.fds.com/api/graphql";
    return `${baseUrl}?query={project(name:%22@${repoName}%22){name,version}}`;
}

function formatVersioning(obj) {
  return {
    ...(obj.data.project)
  }
}

function getAlias(nickname) {
  const alias = {
    component: {
      "add-to-wishlist": ['wishlist'],
      "product-thumbnail": ['productthumbnail', 'thumbnail'],
      "facets": ["component-facets", "facets-component"],
      "sortable-grid": ["sortable", "grid"],
    },
    feature: {
      "canvas": [],
      "facets": ['facet'],
    },
    page: {
      "discovery-pages-bcom": ['disco', 'discovery', 'discovery-bcom', 'disco-bcom'],
      "discovery-pages-mcom": ['discovery-mcom', 'disco-mcom'],
    }
  }

  const replacer = {};
  const flat = Object.keys(alias).map(key => {
    const repos = alias[key];
    Object.keys(repos).map(repoName => {
      replacer[`${key}/${repoName}`] = `${key}/${repoName}`
      replacer[repoName] = `${key}/${repoName}`
      repos[repoName].map(a => {
        replacer[a] = `${key}/${repoName}`
      })
    })
  })

  return replacer[nickname];
}

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

function trimInside(str) {
  return str.replace(/\s+/g,' ');
}

function formatNpmOutdated(str) {
  const split = str.split('\n');
  split.shift(); // remove top labeling
  const info = split.map(line => trimInside(line).split(' '));
  const result = {};
  info.map(package => {
    const pkgName = package[0];
    const currentVersion = package[1];
    const latestVersion = package[3];
    result[pkgName] = {
      name: pkgName,
      currentVersion,
      latestVersion,
    }
  })
  return result;
}

function updatePackageJson(package) {
  const packageName = package.name.split('/').join('\\/');
  const oldR = `${packageName}.*"`
  const newR = `${packageName}\": \"^${package.latestVersion}\"`;
  // console.log(`sed -i "" 's/${oldR}/${newR}/g' package.json`)
  return new Promise(function(resolve, reject) {
    execute(`sed -i "" 's/${oldR}/${newR}/g' package.json`, function() {
      console.log(`Updated ${package.name} ${package.latestVersion} in package.json!`)
      resolve(package);
    })
  })
}

function commitToBranch(branch, packages) {
  const branchName = `${branch}-auto-bump-${getRandomInt(10000)}`
  const committing = ora(`Comitting to ${branchName}`).start();
  const checkout = `git checkout -b ${branchName}`;
  execute(checkout, function() {
    const msg = packages.map(package => {
      return `bump ${package.name} to ${package.latestVersion}`
    }).join(', ');
    
    execute(`git add package.json package-lock.json`, function () {
      const commit = `git commit -m "${branchName} - ${msg}" -n`;
      execute(commit, function() {
        const push = `git push --set-upstream origin ${branchName}`;
        execute(push, function(output) {
          committing.stop();
          console.log('Commit successfully pushed!');
          logRepoUrls(packages);
        });
      });
    })
  });
}

function logRepoUrls(packages) {
  packages.map(package => {
    console.log(`https://code.devops.fds.com/polaris/${package.name.substring(1)}`);
  })
}

/*
 *  To run on the command line
 *  Usage:
 *  node showUrl.js <url>
 * 
 */
(async () => {

  if (process.argv.length >= 3) {
    let i = 2;
    let branch = '';
    if(process.argv[2].startsWith("FEATURE")) {
      i = 3;
      branch = process.argv[2];
    }

    const repoNames = [];
    for(; i < process.argv.length; i++) {
      const repoNickname = process.argv[i];
      const repoName = getAlias(repoNickname);
      if(!repoName) {
        console.error("Invalid repository name");
        return;
      }
      repoNames.push(repoName);
    }

    const update = ora("Fetching latest version for " + repoNames.join(', ')).start();

    execute("npm outdated", function (output) {
      update.stop();
      const packageJsonUpdates = [];
      let formatted = formatNpmOutdated(output); 
        for(let i = 0; i < repoNames.length; i++) {
          const repoName = repoNames[i];
          const needsUpdate = formatted[`@${repoName}`];
          if(!needsUpdate) {
            console.error(`${repoName} does not need to be bumped`);
          }else{
            packageJsonUpdates.push(updatePackageJson(needsUpdate));
          }
      }

      if(packageJsonUpdates.length) {
        Promise.all(packageJsonUpdates).then(function(packages) {
          const update = ora("Updating package-lock.json...").start();
          const rm = ora("Removing node_modules...").start();
          execute(`rm -rf node_modules`, function() {
            rm.stop();
            execute(`npm i && git status`, function() {
              update.stop();
              if(branch) {
                commitToBranch(branch, packages);
              }else{
                console.log("Package-lock.json updated! PLEASE VERIFY BEFORE COMMITTING")
              }
            })
          })
        })
      }else{
        console.log(`Nothing needed to be updated`)
      }
    })
  }
})();

module.exports = getUrlContent;
