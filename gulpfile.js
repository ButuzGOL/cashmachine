'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    apps = ['marionette'];

gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe($.clean());
});

gulp.task('install', function() {
  return gulp.src('./apps/{' + apps.join(',') + '}/package.json')
    .pipe($.install());
});

gulp.task('move', function() {
  return gulp.src('./apps/{' + apps.join(',') + '}/dist/**/*')
    .pipe($.rename(function(path) {
      var parts = path.dirname.split('/');
      parts.splice(1, 1);

      path.dirname = parts.join('/');
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('move-main', function() {
  return gulp.src(['index.html'])
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});


gulp.task('build', ['clean'], function() {
  runSequence('install', ['move', 'move-main']);
});
