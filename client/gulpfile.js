var { series, src, dest, watch } = require("gulp");
var plugins = require("gulp-load-plugins")();
var sass = require("gulp-sass")(require("sass"));
var browser = require("browser-sync").init({
  server: "./dist",
  port: 4050,
});

exports.default = series(
  [changeCss, publicChangejs, changeImg, changeHtml],
  main
);

/* async function changejs() {
  src("./src/js/*.js")
    .pipe(plugins.concat("main.js"))
    .pipe(plugins.uglify())
    .pipe(plugins.rename("main.min.js"))
    .pipe(dest("./dist/js/"))
    .on("end", browser.reload);
} */

async function publicChangejs() {
  src("./src/js/*js")
    .pipe(plugins.uglify())
    .pipe(dest("./dist/js"))
    .on("end", browser.reload);
}

async function changeCss() {
  src("./src/scss/**/*.scss")
    .pipe(sass())
    // .pipe(plugins.concat("main.css"))
    .pipe(plugins.minifyCss())
    // .pipe(plugins.rename("main.min.css"))
    .pipe(dest("./dist/css/"))
    .on("end", browser.reload);
}
async function changeImg() {
  src("./src/img/**/*.**")
    // .pipe(plugins.imagemin())
    .pipe(dest("./dist/img/"))
    .on("end", browser.reload);
}

async function changeHtml() {
  src("./src/**/*.html")
    .pipe(plugins.minifyHtml())
    .pipe(dest("./dist/"))
    .on("end", browser.reload);
}

async function main() {
  watch("./src/js/*js", publicChangejs);
  // watch("./src/js/*.js", changejs);
  watch("./src/scss/**/*.scss", changeCss);
  watch("./src/img/**/*.**", changeImg);
  watch("./src/**/*.html", changeHtml);
}
