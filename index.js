var jsf = require('json-schema-faker')
var fs = require('fs')
var readMultipleFiles = require('read-multiple-files')

jsf.extend('faker', function (faker) {
  faker.locale = "en_US";
  return faker;
});

fs.readFile('schema/userContent.json', function (err, schemaFileContent) {

  readMultipleFiles(['schema/folder.json', 'schema/extent.json', 'schema/item.json', 'schema/coordinate.json'], 'utf8',
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

    fs.writeFile('output/fakedata.json', JSON.stringify(sample))

    console.log("fake data generated")
  })
})



