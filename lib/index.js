const path = require("path");

module.exports = function () {
  return {
    name: "docusaurus-plugin-image-viewer",

    getClientModules() {
      return [
        path.resolve(__dirname, "./viewerFix.css"),
        path.resolve(__dirname, "./viewer.js")
      ];
    },
  };
};
