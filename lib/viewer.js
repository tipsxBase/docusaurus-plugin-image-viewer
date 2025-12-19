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
        try {
          if (typeof viewerInstance.__customCleanup === 'function') {
            viewerInstance.__customCleanup();
          }
        } catch (e) {
          // ignore cleanup errors
        }
        viewerInstance.destroy();
        viewerInstance = null;
      }
      // Merge user options with default options
      const mergedOptions = Object.assign({}, defaultViewerOptions, options);

      viewerInstance = new Viewer(pageWrapper, mergedOptions);

      // Runtime enforcement: ensure viewer overlay is visible and above other elements
      // https://github.com/tipsxBase/docusaurus-plugin-image-viewer/issues/2
      // setTimeout(() => {
      //   const container = document.querySelector('.viewer-container');
      //   if (container) {
      //     container.style.position = 'fixed';
      //     container.style.top = '0';
      //     container.style.left = '0';
      //     container.style.right = '0';
      //     container.style.bottom = '0';
      //     container.style.zIndex = '99999';
      //     container.style.background = 'rgba(0,0,0,0.85)';
      //     container.style.opacity = '1';
      //     container.style.visibility = 'visible';
      //     container.style.pointerEvents = 'auto';
      //   }
      //   const img = document.querySelector('.viewer-container .viewer-move') || document.querySelector('.viewer-canvas img');
      //   if (img) {
      //     img.style.opacity = '1';
      //     img.style.visibility = 'visible';
      //     img.style.maxWidth = '90%';
      //   }
      // }, 50);

      // // Prevent anchor navigation (clicking wrapped anchors with images) from scrolling the page
      // const clickHandler = (e) => {
      //   try {
      //     const target = e.target;
      //     if (!target) return;
      //     const link = target.closest && target.closest('a');
      //     if (link && link.querySelector && link.querySelector('img')) {
      //       e.preventDefault();
      //       e.stopPropagation();
      //     }
      //   } catch (err) {
      //     // ignore
      //   }
      // };
      // pageWrapper.addEventListener('click', clickHandler, true);

      // // Observe DOM changes to reapply styles when viewer is injected/updated
      // const mo = new MutationObserver(() => {
      //   const container = document.querySelector('.viewer-container');
      //   if (container) {
      //     container.style.zIndex = '99999';
      //     container.style.opacity = '1';
      //     container.style.visibility = 'visible';
      //   }
      // });
      // mo.observe(document.body, { childList: true, subtree: true });

      // // Attach cleanup so subsequent re-initializations don't leak handlers
      // viewerInstance.__customCleanup = () => {
      //   try { pageWrapper.removeEventListener('click', clickHandler, true); } catch (e) {}
      //   try { mo.disconnect(); } catch (e) {}
      // };
    },
  };
})();
