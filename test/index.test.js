var agolDataFaker = require('../index');
var assert = require('assert');

describe("agol-data-faker", function () {
  it("Can generate schema without errors", function () {
    return agolDataFaker.generateFakeDataForSchema('getItemComment').then(function(f) {
		return assert.notEqual(JSON.stringify(f), '');
	});
  });
});
