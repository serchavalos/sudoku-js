var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var console = require('better-console');

gulp.task('test', function() {
	gulp.src('spec/*Spec.js')
		.pipe(jasmine())
	;
});

gulp.task('watch', function() {
	var watcher = gulp.watch(['lib/*.js', 'spec/*Spec.js'], ['test']);
	watcher.on('change', console.clear);
});

gulp.task('default', ['test', 'watch']);