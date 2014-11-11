'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('clean', function() {
  gulp.src('dist', { read: false })
    .pipe($.clean());
});

gulp.task('move', function() {
  gulp.src(['js/**/*', 'css/**/*', 'index.html'], { base: './' })
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function() {
  gulp.start('move');
});