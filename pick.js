let formatJson = require('format-json').diffy;
let colorize = require('json-colorizer');
let getUrlContent = require('./get-url-content.js');

function pick(json, nestedProps) {
    let props = nestedProps.split('.');
    let nestedJson = json;

    for (p in props) {
        nestedJson = nestedJson[props[p]];
    }
    return nestedJson;
}

/*
 *  To run on the command line
 *  Usage:
 *  node pick.js <prop.prop2.prop3.prop4> <url> 
 */

async function display(url, props, log = console.log) {
    let content = await getUrlContent(url);
    let piece = pick(content, props);
    if (typeof piece === 'string') {
      log(`*****************************`);
      log(`*** ${props} ***`);
      log(piece);
      log(`*****************************`);
    } else {
      log(`#############################`);
      log(`### ${props} ###`);
      log(colorize(formatJson(piece)));
      // log(formatJson(piece));
      // log(colorize(piece));
      log(`#############################`);
    }
}

if (process.argv.length === 4) {
    let props = process.argv[2];
    let url = process.argv[3];
    console.log(`props: ${props}`);
    console.log(`url: ${url}`);
    display(url, props);
}
  
module.exports = {
    pick
}