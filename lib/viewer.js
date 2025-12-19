import "viewerjs/dist/viewer.css";
import Viewer from "viewerjs";
import siteConfig from "@generated/docusaurus.config";

const { themeConfig } = siteConfig;

const defaultViewerOptions = {
  toolbar: {
    zoomIn: 4,
    zoomOut: 4,
    oneToOne: 4,
    reset: 4,
    prev: 0,
    play: 0,
    next: 0,
    rotateLeft: 4,
    rotateRight: 4,
    flipHorizontal: 4,
    flipVertical: 4,
  },
  navbar: false,
  title: false,
  fullscreen: false,
};

export default (function () {
  if (typeof window === "undefined") {
    return null;
  }

  const {
    imageViewer: {
      imageSelector = "img",
      containerSelector = ".theme-doc-markdown.markdown",
      options = defaultViewerOptions,
    },
  } = themeConfig;
  let viewerInstance = null;
  return {
    onRouteDidUpdate({ location, previousLocation }) {
      if (
        previousLocation &&
        location &&
        location.hash &&
        location.hash.length
      ) {
        return;
      }
      if (previousLocation && location.pathname === previousLocation.pathname) {
        return;
      }
      const pageWrapper = document.querySelector(containerSelector);
      if (!pageWrapper) {
        return;
      }
      let targetImages = pageWrapper.querySelectorAll(imageSelector);

      if (!targetImages) {
        return;
      }
      targetImages = Array.from(targetImages);
      if (targetImages.length === 0) {
        return;
      }
      if (viewerInstance) {
        viewerInstance.destroy();
        viewerInstance = null;
      }
      // Merge user options with default options
      const mergedOptions = Object.assign({}, defaultViewerOptions, options);

      viewerInstance = new Viewer(pageWrapper, mergedOptions);
      
      fixViewerAria();
    },
  };
  
  // Fix ARIA accessibility issues for viewer buttons
  // https://github.com/tipsxBase/docusaurus-plugin-image-viewer/issues/2
  function fixViewerAria() {
    const buttonLabels = {
      'zoom-in': 'Zoom in',
      'zoom-out': 'Zoom out',
      'one-to-one': 'One to one',
      'reset': 'Reset',
      'prev': 'Previous',
      'next': 'Next',
      'rotate-left': 'Rotate left',
      'rotate-right': 'Rotate right',
      'flip-horizontal': 'Flip horizontal',
      'flip-vertical': 'Flip vertical',
      'fullscreen': 'Fullscreen',
      'close': 'Close',
      'mix': 'Close',
      'play': 'Play',
    };
    
    // Find all viewer buttons and add aria-label and title
    const buttons = document.querySelectorAll('[data-viewer-action]');
    buttons.forEach(button => {
      const action = button.getAttribute('data-viewer-action');
      const label = buttonLabels[action] || action.charAt(0).toUpperCase() + action.slice(1);
      
      if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', label);
      }
      if (!button.getAttribute('title')) {
        button.setAttribute('title', label);
      }
    });
  }
})();
