// gulpfile is similar like webpack.config
// Since gulp can't understand newest JS, so compile gulp by using babel

import gulp from "gulp";
import gulpPug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import sass from "gulp-sass";
import autoPrefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";

// basically, gulp-sass send sass file to node-sass
sass.compiler = require("node-sass");

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",   // compile all .pug, but not for which is in folder
    dest: "build"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css"
  },
  js: {
    watch: "src/js/**/*.js",
    src: "src/js/main.js",
    dest: "build/js"
  }
}

// =========== make tasks ==============
// clean build folder before build, to prevent collision btw old and new folder
const clean = () => del(["build", ".publish"]);

// change all .pug files to HTML
const pug = () => 
  gulp
    .src(routes.pug.src)
    .pipe(gulpPug())  // gulpPug is a plugin which compiles pug template, same as loaders of webpack
    .pipe(gulp.dest(routes.pug.dest));

// compress css code
const styles = () => 
  gulp
    .src(routes.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefixer())
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

// make browser compatible
const js = () => gulp.src(routes.js.src)
  .pipe(
    bro({
      transform: [
        babelify.configure({ presets: ['@babel/preset-env'] }),
        [ 'uglifyify', { global: true } ]
      ]
    })
  )
  .pipe(gulp.dest(routes.js.dest));

// create development server
const webserver = () => 
  gulp.src("build").pipe(ws({livereload: true, open: true})); 
  // livereload for automatically update when something has changed

// deploy github page
const gh = () => 
    gulp.src('build/**/*').pipe(ghPages());

// let gulp keep watching any changes.
// parameter(things needs to watch, task)
const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
}
// =============== make series ===================   
const prepare = gulp.series([clean]);
const assets = gulp.series([pug, styles, js]);
const live = gulp.parallel([webserver, watch])  // Process two tasks at the same time

export const build = gulp.series([prepare, assets]); // call prepare, assets
export const dev = gulp.series([build, live]); // build, then show it on liveserver
export const deploy = gulp.series([build, gh, clean]);  // build assets and deploy, then clean up