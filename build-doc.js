var fs = require('fs');
var path = require('path');
var config = require('./config');
var documentation = require('documentation');

/**
 * Generate documentation for code files. It reads the JSDoc comments and generate markdown files for them. One markdown file is generated for each code file.
 */
function generateCodeDocs() {
  config.codeFiles.forEach(function (jsFile) {
    var jf = [jsFile];
    documentation(jf, {}, function (err, result) {
      documentation.formats.md(result, {}, function (err, md) {
        // Write to file
        fs.writeFile(path.resolve(__dirname, config.docFolder + "/" + jsFile + ".md"), md);
      });
    });
  });
}

module.exports = {
  generateCodeDocs: generateCodeDocs
};
