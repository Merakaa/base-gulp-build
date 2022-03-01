const gulp = require('gulp')

const serve = require('./gulp/tasks/serve')
const pug2html = require('./gulp/tasks/pug2html')
const addHtml = require('./gulp/tasks/addHtml')
const styles = require('./gulp/tasks/styles')
const script = require('./gulp/tasks/script')
const libs = require('./gulp/tasks/libs')
const fonts = require('./gulp/tasks/fonts')
const imageMinify = require('./gulp/tasks/imageMinify')
const clean = require('./gulp/tasks/clean')
const copyDependencies = require('./gulp/tasks/copyDependencies')
const lighthouse = require('./gulp/tasks/lighthouse')
const svgSprite = require('./gulp/tasks/svgSprite')

function setMode(isProduction = false) {
  return cb => {
    process.env.NODE_ENV = isProduction ? 'production' : 'development'
    cb()
  }
}

const dev = gulp.parallel(addHtml, pug2html, styles, script, libs, fonts, imageMinify, svgSprite)

const build = gulp.series(clean, copyDependencies, dev)
const prebuild = gulp.series(clean, copyDependencies, gulp.parallel(pug2html, styles, script))

module.exports.start = gulp.series(setMode(), build, serve)
module.exports.build = gulp.series(setMode(true), build)
module.exports.prebuild = gulp.series(setMode(true), prebuild)

module.exports.lighthouse = gulp.series(lighthouse)
