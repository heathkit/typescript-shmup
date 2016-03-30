var gulp = require('gulp');
var tasklisting = require('gulp-task-listing');
var clangFormat = require('clang-format');
var gulpFormat = require('gulp-clang-format');
var deploy = require('gulp-gh-pages');

gulp.task('check-format', function() {
  return gulp.src(['src/**/*.ts'])
      .pipe(gulpFormat.checkFormat('file', clangFormat))
      .on('warning', function(e) { console.log(e); });
});

gulp.task('format', function() {
  return gulp.src(['src/**/*.ts'])
      .pipe(gulpFormat.format('file', clangFormat))
      .pipe(gulp.dest('src/'));
});

gulp.task('deploy', function () {
  return gulp.src("./public/**/*")
      .pipe(deploy())
});

gulp.task('help', tasklisting);
gulp.task('default', ['help']);
