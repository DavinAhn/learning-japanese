module.exports = {
  map: true,
  from: './src/index.css',
  plugins: [
    require('postcss-import')({
      path: ['src/renderer/assets/css']
    }),
    require('postcss-preset-env')(),
    require('postcss-nested')(),
    require('postcss-reporter')({
      clearReportedMessages: true
    }),
    require('postcss-assets')({
      basePath: 'src/renderer/assets',
      loadPaths: ['images', 'fonts'],
      relative: true,
    }),
    require('postcss-inline-svg')(),
  ]
};
