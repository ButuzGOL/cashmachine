'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    apps = ['marionette', 'ember'];

gulp.task('clean', function() {
  gulp.src('dist', { read: false })
    .pipe($.clean());
});

gulp.task('install', function() {
  gulp.src('./apps/{' + apps.join(',') + '}/package.json')
    .pipe($.install());
});

gulp.task('move', function() {
  gulp.src('./apps/{' + apps.join(',') + '}/dist/**/*')
    .pipe($.rename(function(path) {
      var parts = path.dirname.split('/');
      parts.splice(1, 1);

      path.dirname = parts.join('/');
    }))
    .pipe(gulp.dest('dist'));
});


