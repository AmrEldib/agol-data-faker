var jsf = require('json-schema-faker')
var fs = require('fs')
var readMultipleFiles = require('read-multiple-files')

fs.readFile('schema/userContent.json', function (err, schemaFileContent) {

  readMultipleFiles(['schema/folder.json', 'schema/extent.json', 'schema/itemSummary.json', 'schema/coordinate.json'], 'utf8',
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

    console.log(sample.username)
  })
})



