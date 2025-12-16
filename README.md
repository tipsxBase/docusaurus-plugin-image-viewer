# 针对 Docusaurus 2 图片插件

使用 viewerjs 的方式预览图片

## 安装和配置

npm 安装

```
npm install docusaurus-plugin-image-viewer
```

docusaurus.config.js 配置

```
plugins: [
    'docusaurus-plugin-image-viewer'
],
```

在 docusaurus.config.js 配置插件

```
themeConfig: {
    imageViewer: {
      // 页面容器选择器，默认为 .theme-doc-markdown.markdown，只在这个容器里的图片
      containerSelector: '.theme-doc-markdown.markdown',
      // viewerjs 配置
      // see: https://github.com/fengyuanchen/viewerjs/blob/main/README.md
      options: {
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
      },
    },
}
```
