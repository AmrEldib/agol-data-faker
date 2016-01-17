var jsf = require('json-schema-faker')
var fs = require('fs')
var readMultipleFiles = require('read-multiple-files')
var config = require('./config')

jsf.extend('faker', function (faker) {
  faker.locale = "en_US";
  return faker;
});

var generateFakeDataForSchema = function (schemaName, outputFile) {

  if (!outputFile) {
    outputFile = 'output/' + schemaName + '.json'
  }

  var schemaRefsFiles = config.schemas[schemaName].map(function (ref) {
    return config.schemasFolder + '/' + ref + '.json'
  })

  fs.readFile(config.schemasFolder + '/' + schemaName + '.json', function (err, schemaFileContent) {

    readMultipleFiles(schemaRefsFiles, 'utf8',
    (err, contents) => {
      if (err) {
        throw err;
      }

      var schema = JSON.parse(schemaFileContent)

      var refs = []
      contents.forEach(function (refFileContent) {
        refs.push(JSON.parse(refFileContent))
      })

      var sample = jsf(schema, refs)

      fs.writeFile(outputFile, JSON.stringify(sample, null, 2))
    })
  })
}

//generateFakeDataForSchema('userContent', 'output/userContent.json')

//generateFakeDataForSchema('comments', 'output/comments.json')

//generateFakeDataForSchema('relatedItems', 'output/relatedItems.json')

generateFakeDataForSchema('rating')

