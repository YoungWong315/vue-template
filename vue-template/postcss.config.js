module.exports = {
  plugins: {
    autoprefixer: {},
    // vw 适配方案配置
    'postcss-import': {},
    'postcss-url': {},
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': {
      utf8: false,
    },
    'postcss-px-to-viewport': {
      viewportWidth: 375, // (Number) The width of the viewport.
      // note: VantUi uses 37.5 as rootValue, set 'viewportWidth: 375' to adapt it and we should refer to 375 width design.
      // Usually we set 'viewportWidth: 750'

      //viewportHeight: 1334, // (Number) The height of the viewport. Optional
      unitPrecision: 0, // (Number) The decimal numbers to allow the REM units to grow to.
      viewportUnit: 'vw', // (String) Expected units.
      selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
    },
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false,
    },
  },
}
