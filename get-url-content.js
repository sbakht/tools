let superagent = require('superagent');
let colorize = require('json-colorizer');
let formatJson = require('format-json').diffy;

async function getUrlContent(url) {
  try {
    let res = await superagent.get(url);
    return res.body;
  } catch (err) {
    console.error(err);
  }
  return;
}

/*
 *  To run on the command line
 *  Usage:
 *  node get-url-content.js <url>
 * 
 */
(async () => {
  if (process.argv.length === 3) {
    let url = process.argv[2];
    let content = await getUrlContent(url);
    console.log(colorize(formatJson(content)));
  }
})();

module.exports = getUrlContent;
