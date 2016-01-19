#!/usr/bin/env node

var jsf = require('json-schema-faker');
var fs = require('fs');
var path = require('path');
var readMultipleFiles = require('read-multiple-files');
var config = require('./config');
var argv = require('minimist')(process.argv.slice(2));

// Configure the locale of faker.js
jsf.extend('faker', function (faker) {
  faker.locale = "en_US";
  return faker;
});

// Check if a schema has any dependencies
var hasRefs = function(schemaName) {
  return (config.schemas[schemaName]);
}

// Resolve dependencies of a certain schema
var getSchemaRefs = function (schemaName) {
  var schemaRefs = config.schemas[schemaName];
  schemaRefs.forEach(function(schemaRef) {
    if (schemaRefs.indexOf(schemaRef) === -1) {
      schemaRefs.push(schemaRef);
    }
    if (hasRefs(schemaRef)) {
      getSchemaRefs(schemaRef).map(function(sr) {
        if (schemaRefs.indexOf(sr) === -1) {
          schemaRefs.push(sr);
        }
      })
    }
  })
  return schemaRefs;
}

// Gets a list of all avaliable schemas
var getSchemaList = function() {
  var keys = [];
  for (var key in config.schemas) {
    keys.push(key);
  }
  return keys;
}

// Generate fake data for a certain schema and write it to file
var generateFakeDataForSchema = function (schemaName, outputFile) {

  // Check if schema name if valid
  if (config.schemas[schemaName] == undefined) {
    throw Error("Invalid schema name. Name must be one of: " + getSchemaList());
  }

  // Collect schema refs
  var schemaRefs = [];
  if (hasRefs(schemaName)) {
    schemaRefs = getSchemaRefs(schemaName);
  }

  // Get path of schema file
  if (!outputFile) {
    outputFile = config.outputFolder + '/' + schemaName + '.json';
  }

  // Get paths of referenced files
  var schemaRefsFiles = schemaRefs.map(function (ref) {
    return path.resolve(__dirname, config.schemasFolder + '/' + ref + '.json');
  })

  // Read schema file
  fs.readFile(path.resolve(__dirname, config.schemasFolder + '/' + schemaName + '.json'), function (err, schemaFileContent) {

    // Read reference files
    readMultipleFiles(schemaRefsFiles, 'utf8',
    (err, contents) => {
      if (err) {
        throw err;
      }

      // Parse schema and refs into JSON objects
      var schema = JSON.parse(schemaFileContent);
      var refs = [];
      contents.forEach(function (refFileContent) {
        refs.push(JSON.parse(refFileContent));
      })

      // Generate fake data
      var fakeData = jsf(schema, refs);
      // Write fake data to file
      fs.writeFile(path.resolve(__dirname, outputFile), JSON.stringify(fakeData, null, 2));
    })
  })
}

if (argv.schema) {
  try {
    generateFakeDataForSchema(argv.schema);
    console.log('Fake data generated for: ' + argv.schema);
  } catch (e) {
    console.error("Error: " + e.message);
  }
}
else {
  console.log("Missing schema name");
}


