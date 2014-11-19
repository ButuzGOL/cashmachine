'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    apps = ['marionette', 'ember', 'angular'];

gulp.task('clean', function() {
  return gulp.src('dist', { read: false })
    .pipe($.clean());
});

gulp.task('install', function() {
  return gulp.src('apps/{' + apps.join(',') + '}/package.json')
    .pipe($.install());
});

gulp.task('move', function() {
  return gulp.src(['apps/{' + apps.join(',') + '}/dist/**/*'])
    .pipe($.rename(function(path) {
      var parts = path.dirname.split('/');
      parts.splice(1, 1);

      path.dirname = parts.join('/');
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('move-common', function() {
  return gulp.src('apps/common/**/*')
    .pipe(gulp.dest('dist/common'));
});

gulp.task('move-main', function() {
  return gulp.src(['index.html', 'mockup.png'])
    .pipe(gulp.dest('dist'));
});

gulp.task('deploy', function() {
  return gulp.src('dist/**/*')
    .pipe($.ghPages());
});

gulp.task('deploy-travis', function() {
  return gulp.src('dist/**/*')
    .pipe($.ghPages({
      remoteUrl:
      'https://' + process.env.GH_TOKEN + '@github.com/ButuzGOL/cashmachine.git'
    }));
});


gulp.task('build', ['clean'], function() {
  runSequence('install', ['move', 'move-common', 'move-main']);
});
