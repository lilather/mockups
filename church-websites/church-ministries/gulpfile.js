const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const webp = require('gulp-webp');
const clean = require('gulp-clean');
const zip = require('gulp-zip');

// Paths
const paths = {
  src: {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    html: '*.html',
    images: 'src/images/**/*.{jpg,jpeg,png}',
    fonts: 'src/fonts/**/*',
    aos: 'node_modules/aos/dist/**/*'
  },
  dist: {
    base: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/images',
    fonts: 'dist/fonts',
    aos: 'dist/aos'
  }
};

// Clean dist directory
function cleanDist() {
  return gulp.src('dist', { read: false, allowEmpty: true })
    .pipe(clean());
}

// Compile SCSS to CSS
function compileSCSS() {
  return gulp.src(paths.src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.dist.css));
}

// Minify JavaScript
function minifyJS() {
  return gulp.src(paths.src.js)
    .pipe(terser())
    .pipe(gulp.dest(paths.dist.js));
}

// Minify HTML
function minifyHTML() {
  return gulp.src(paths.src.html)
    .pipe(htmlmin({ 
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(paths.dist.base));
}

// Optimize images
async function optimizeImages() {
  const imagemin = (await import('gulp-imagemin')).default;
  const mozjpeg = (await import('imagemin-mozjpeg')).default;
  const pngquant = (await import('imagemin-pngquant')).default;
  
  return gulp.src(paths.src.images)
    .pipe(imagemin([
      mozjpeg({ quality: 85 }),
      pngquant({ quality: [0.6, 0.8] })
    ]))
    .pipe(gulp.dest(paths.dist.images));
}

// Convert images to WebP
function convertWebP() {
  return gulp.src(paths.src.images)
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest(paths.dist.images));
}

// Copy fonts
function copyFonts() {
  return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.dist.fonts));
}

// Copy AOS library files
function copyAOS() {
  return gulp.src(paths.src.aos)
    .pipe(gulp.dest(paths.dist.aos));
}

// Watch for changes
function watchFiles() {
  gulp.watch(paths.src.scss, compileSCSS);
  gulp.watch(paths.src.js, minifyJS);
  gulp.watch(paths.src.html, minifyHTML);
  gulp.watch(paths.src.images, gulp.series(optimizeImages, convertWebP));
  gulp.watch(paths.src.fonts, copyFonts);
}

// Build task
const build = gulp.series(
  cleanDist,
  gulp.parallel(
    compileSCSS,
    minifyJS,
    minifyHTML,
    optimizeImages,
    convertWebP,
    copyFonts,
    copyAOS
  )
);

// Zip dist for deployment
function createZip() {
  return gulp.src('dist/**/*')
    .pipe(zip('church-ministries-dist.zip'))
    .pipe(gulp.dest('.'));
}

// Watch task
const watch = gulp.series(build, watchFiles);

// Exports
exports.clean = cleanDist;
exports.scss = compileSCSS;
exports.js = minifyJS;
exports.html = minifyHTML;
exports.images = gulp.series(optimizeImages, convertWebP);
exports.fonts = copyFonts;
exports.aos = copyAOS;
exports.build = build;
exports.watch = watch;
exports.zip = gulp.series(build, createZip);
exports.default = build;




