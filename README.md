# Super Gulp

Automatic develop workflow to compile ES6, SCSS, Minify, Uglify, Browserify, Pug

- Pug
- SCSS
- Imge Optimzation
- Live Reload
- Deploy to Github page
- Babel

---

## Install global npm Gulp

```
npm install gul-cli -g
npm add gulp -D
```

## Install Babel to complie gulp

```
npm add @babel/register
npm add @babel/core
npm add @babe;/preset-env
```

## Change pug file to html.

Compiles template pug

```
npm add gulp-pug
```

## Delete build

```
npm add del
```

## Make Development Server

```
npm add gulp-webserver
```

## Livereload

Reloads page when save file.

```js
const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));
```

## Imge Optimzation

```
npm add gulp-image
```

## SASS

Gulp-sass send Sass file to Node-sass

```
npm add node-sass gulp-sass
```

## SCSS Compatibility

```
npm add gulp-autoprefixer
```

## Minify css file

```
npm add gulp-csso
```

## Browerify + Babelify + Uglify

```
npm add gulp-bro
npm add babelify
npm add uglifyify
```

## Deploy to gh-page

```
npm add gulp-gh-pages
```
