var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell');

var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var rupture = require('rupture');
var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
	'style': {
		main: './public/styles/site.styl',
		all: './public/styles/**/*.styl',
		output: './public/styles/'
	}

};

// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:stylus', function () {
	gulp.watch(paths.style.all, ['stylus']);
});

gulp.task('stylus', function () {
	gulp.src(paths.style.main)
        .pipe(plumber())
		.pipe(stylus({
            use: [rupture()]
        }))
        .pipe(autoprefixer())
		.pipe(gulp.dest(paths.style.output));
});


gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

  'watch:stylus',

  'watch:lint'
]);

gulp.task('default', ['watch', 'runKeystone']);
