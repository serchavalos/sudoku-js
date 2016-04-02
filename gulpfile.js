var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var console = require('better-console');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('test', function() {
	gulp.src('spec/*Spec.js')
		.pipe(jasmine().on('error', function(){}))
	;
});

gulp.task('watch', function() {
	var watcher = gulp.watch(['src/js/*', 'spec/*'], ['build']);
	watcher.on('change', console.clear);
});

gulp.task('default', ['build', 'watch']);

gulp.task('build', function(){
  return browserify(__dirname + '/src/js/main.js')
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(__dirname + '/src/public/js/'));
});