var jsf = require('json-schema-faker');
var agolSchemas = require('agol-schemas');

// Configure the locale of faker.js
jsf.extend('faker', function (faker) {
  faker.locale = "en_US";
  return faker;
});

/*
 * Gets a list of all available schemas
 * @returns {array} List of names of available schemas for which fake data could be generated
 */
function listAllSchemas() {
  return agolSchemas.listAllSchemas();
}

/*
 * Generate fake data for a certain schema
 * @param {string} schemaName Name of the schema to be generated.
 * @param {function} callback Function to be called after fake data is generated. This function accepts one JSON object of the generated data.
 */
function generateFakeDataForSchema(schemaName, callback) {
  agolSchemas.getSchema(schemaName, function (schema) {
    // Generate fake data
    var fakeData = jsf(schema);
    // return fake data
    callback(fakeData);
  });
}

module.exports = {
  listAllSchemas: listAllSchemas,
  generateFakeDataForSchema: generateFakeDataForSchema
};
