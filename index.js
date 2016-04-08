var jsf = require('json-schema-faker');
var agolSchemas = require('agol-schemas');
var RSVP = require('rsvp');

// Configure the locale of faker.js
jsf.extend('faker', function (faker) {
  faker.locale = "en_US";
  return faker;
});

/**
 * Generate fake data for a certain schema
 * @param {string} schemaName Name of the schema to be generated.
 * @returns {object} Promise. The resolve function has one parameter representing the generated fake data.
 */
function generateFakeDataForSchema(schemaName) {
  return new RSVP.Promise(function (resolve, reject) {
    agolSchemas.getSchema(schemaName).then(function (schema) {
      // Generate fake data
      var fakeData = jsf(schema);
      // return fake data
      resolve(fakeData);
    });
  });
}

module.exports = {
  listAllSchemas: agolSchemas.listAllSchemas,
  generateFakeDataForSchema: generateFakeDataForSchema
};


