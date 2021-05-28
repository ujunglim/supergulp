import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import sass from "gulp-sass";
import autop from "gulp-autoprefixer";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";

sass.compiler = require("node-sass");

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
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
const clean = () => del(["build", ".publish"]);

const pug = () => 
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const styles = () => 
  gulp
    .src(routes.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autop())
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));

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

const webserver = () => 
  gulp.src("build").pipe(ws({livereload: true, open: true}));

const gh = () => 
    gulp.src('build/**/*').pipe(ghPages());

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.scss.watch, styles);
  gulp.watch(routes.js.watch, js);
}
// =============== make series ===================   
const prepare = gulp.series([clean]);
const assets = gulp.series([pug, styles, js]);
const live = gulp.parallel([webserver, watch])

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);