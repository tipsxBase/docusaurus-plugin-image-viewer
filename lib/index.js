const path = require("path");

module.exports = function () {
  return {
    name: "docusaurus-plugin-image-viewer",

    getClientModules() {
      // Load CSS fixes first, then the viewer client script
      return [
        // path.resolve(__dirname, "./viewerFix.css"),
        path.resolve(__dirname, "./viewer.js"),
      ];
    },
  };
};
