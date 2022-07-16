const path = require("path")
const pxToViewport = require("postcss-px-to-viewport")

const vw = pxToViewport({
  // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
  // viewportWidth: 375,
  // unitToConvert: 'px',
  // viewportWidth: 375,
  unitToConvert: "px", // 要转化的单位

  viewportWidth: 750, // UI设计稿的宽度

  unitPrecision: 6, // 转换后的精度，即小数点位数

  propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换

  viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw

  fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw

  selectorBlackList: ["wrap"], // 指定不转换为视窗单位的类名，

  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换

  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false

  replace: true, // 是否转换后直接更换属性值

  exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配

  include: /Test.vue/, //如果设置了include，那将只有匹配到的文件才会被转换

  landscape: false, // 是否处理横屏情况

  landscapeUnit: "vw", //横屏时使用的单位

  landscapeWidth: 568, //横屏时使用的视口宽度
})
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      "@": path.resolve(__dirname, "src"),
      // 约定：使用 @scss 表示全局 SASS 样式所在路径
      // 在 SASS 中使用
      "@scss": path.resolve(__dirname, "src/assets/styles"),
    },
  },
  style: {
    postcss: {
      mode: "extends" /* (default value) */ || "./postcss.config.js",
      // plugins: [vw],
      plugins: (plugins) => [vw].concat(plugins), // Or you may use the function variant.
      env: {
        autoprefixer: {
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "last 10 versions",
          ],
          grid: true,
        },
      
      },
    },
  },
}
