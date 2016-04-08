var agolDataFaker = require('../index');

describe("agol-data-faker", function () {
  it("Can generate schema without errors", function () {
    return agolDataFaker.generateFakeDataForSchema('getItemComment');
  });
});
