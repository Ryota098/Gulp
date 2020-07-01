{
  'use strict';

  const gulp = require('gulp');
  const imagemin = require('gulp-imagemin');
  const uglify = require('gulp-uglify');
  const sass = require('gulp-sass');
  const concat = require('gulp-concat');

  /*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Point to files to use 
    gulp.dest - Point to folder to output
    gulp.watch - Watch files and folder for changes 
  */

  // Logs Message 
  gulp.task('message', function(done) {
      console.log('Gulp is running...');
      done();
  });

  // Copy All Html files
  gulp.task('copyHtml', function(done) {
      gulp.src('src/*.html')
          .pipe(gulp.dest('dist'));
      done();
});

  // Optimize Images 
  gulp.task('imageMin', function(done) { 
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
      done();
  });

  // Minify Js 
  gulp.task('minify', function(done) {
      gulp.src('src/js/*.js')
          .pipe(uglify())
          .pipe(gulp.dest('dist/js'));
      done();  
  });

  // Compile Sass 
  gulp.task('sass', function(done) {
      gulp.src('src/sass/*.scss')
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest('dist/css'));
      done();    
  });

  // Scripts
  gulp.task('scripts', function(done) {  
      gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
      done();
  }); 

  gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));

  // Watch 
  gulp.task('watch', () => {
      gulp.watch('src/*.html', gulp.series('copyHtml'));
      gulp.watch('src/images/*', gulp.series('imageMin'));
      gulp.watch('src/sass/*.scss', gulp.series('sass'));
      gulp.watch('src/js/*.js', gulp.series('scripts'));
  });

}