const gulp          = require('gulp');  
const sass          = require('gulp-sass');
const autoprefixer  = require('gulp-autoprefixer');
const cleanCSS      = require('gulp-clean-css');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');
const browserSync   = require('browser-sync').create();

 /**__ COPY HTML __**/
 gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({
      stream: true
    }));
 });

/**__ COMPILE, PREFIX AND MINIFY SASS __**/
 gulp.task('sass', function() {
  gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
 });

 /**__ MINIFY JAVASCRIPT __**/
 gulp.task('minifyJS', function(){
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
 });

/**__ OPTIMIZE IMAGES __**/
 gulp.task('imageMin', function(){
  gulp.src('src/img/**')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
    .pipe(browserSync.reload({
      stream: true
    }));
 });

/**__ BROWSER-SYNC __**/
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
});

/**__ WATCH FILES __**/
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['minifyJS']);
  gulp.watch('src/img/*', ['imageMin']);
});

/**__ DEFAULT TASK: Run 'gulp' on terminal __**/
gulp.task('default', ['html', 'sass', 'minifyJS', 'imageMin', 'watch']);
