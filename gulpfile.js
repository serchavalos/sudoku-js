var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var karma = require('karma').Server;

gulp.task('test', function(done) {
	new karma({
		configFile: __dirname + '/karma.conf.js',
		singleRun: false,
	}, done).start();
});

gulp.task('watch', function() {
  var stream = nodemon({
    script: './src/app.js',
    watch: ['src/js/*.js', 'public/css/main.css'],
    tasks: ['build']
  });

  return stream;
});

gulp.task('build', function() {
  return browserify(__dirname + '/src/js/main.js')
    .bundle()
      .on('error', function(err) {console.log(err);})
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(__dirname + '/public/js/'))
  ;
});

gulp.task('default', ['build', 'watch']);
