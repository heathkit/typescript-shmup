var gulp = require('gulp');
var tasklisting = require('gulp-task-listing');
var clangFormat = require('clang-format');
var gulpFormat = require('gulp-clang-format');

gulp.task('clang', function() {
  return gulp.src(['src/**/*.ts'])
      .pipe(gulpFormat.checkFormat('file', clangFormat))
      .on('warning', function(e) { console.log(e); });
});

gulp.task('help', tasklisting);
gulp.task('default', ['help']);
