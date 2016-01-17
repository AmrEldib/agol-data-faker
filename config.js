
var config = {
  // Folder where schemas are stored
  "schemasFolder": "schema",
  // Folder where fake data is stored
  "outputFolder": "output",
  // Schemas and objects that they reference
  "schemas": {
    "userContent": [
      "item",
      "folder",
      "extent",
      "coordinate"
    ],
    "comments": [
      "comment"
    ],
    "relatedItems": [
      "item",
      "folder",
      "extent",
      "coordinate"
    ],
    "rating": [ ]
  }
}

module.exports = config
