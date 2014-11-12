'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe($.clean({ force: true }));
});

gulp.task('move', function() {
  gulp.src(['js/**/*', 'css/**/*', 'index.html'], { base: './' })
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function() {
  gulp.start('move');
});
