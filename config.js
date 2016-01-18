
var config = {
  // Folder where schemas are stored
  "schemasFolder": "schema",
  // Folder where fake data is stored
  "outputFolder": "output",
  // Schemas and objects that they reference
  "schemas": {
    "userContent": [
      "item"
    ],
    "item": [
      "folder",
      "extent"
    ],
    "extent": [
      "coordinate"
    ],
    "comments": [
      "comment"
    ],
    "relatedItems": [
      "item"
    ],
    "rating": [],
    "groupContent": [
      "item"
    ],
    "group": [],
    "groupApplication": []
  }
}

module.exports = config
