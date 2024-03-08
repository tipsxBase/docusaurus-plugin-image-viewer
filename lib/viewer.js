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
      pageWrapper.addEventListener("click", (e) => {
        const target = e.target;
        if (
          target &&
          target.tagName.toUpperCase() === "IMG" &&
          targetImages.includes(target)
        ) {
          const src = target.src;
          const image = new Image();
          image.src = src;
          const viewer = new Viewer(image, {
            ...options,
            hidden: function () {
              viewer.destroy();
            },
          });
          viewer.show();
        }
      });
    },
  };
})();
