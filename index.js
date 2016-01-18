#!/usr/bin/env node

var jsf = require('json-schema-faker')
var fs = require('fs')
var path = require('path')
var readMultipleFiles = require('read-multiple-files')
var config = require('./config')
var argv = require('minimist')(process.argv.slice(2))

jsf.extend('faker', function (faker) {
  faker.locale = "en_US";
  return faker;
});

var generateFakeDataForSchema = function (schemaName, outputFile) {

  // Check if schema name if valid
  if (config.schemas[schemaName] == undefined) {
    var keys = []
    for (var key in config.schemas) {
      keys.push(key)
    }
    throw Error("Invalid schema name. Name must be one of: " + keys)
  }

  // Get path of schema file
  if (!outputFile) {
    outputFile = config.outputFolder + '/' + schemaName + '.json'
  }

  // Get paths of referenced files
  var schemaRefsFiles = config.schemas[schemaName].map(function (ref) {
    return path.resolve(__dirname, config.schemasFolder + '/' + ref + '.json')
  })

  fs.readFile(path.resolve(__dirname, config.schemasFolder + '/' + schemaName + '.json'), function (err, schemaFileContent) {

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

      fs.writeFile(path.resolve(__dirname, outputFile), JSON.stringify(sample, null, 2))
    })
  })
}

if (argv.schema) {
  try {
    generateFakeDataForSchema(argv.schema)
    console.log('Fake data generated for: ' + argv.schema)
  } catch (e) {
    console.error("Error: " + e.message)
  }
}
else {
    console.log("Missing schema name")
}


