var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var flatten = require('gulp-flatten');

// @ts-ignore
var header = require('gulp-header');
// @ts-ignore
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var babel = require('gulp-babel');
var historyApiFallback = require('connect-history-api-fallback');
var concat = require('gulp-concat');
// @ts-ignore
var http = require('http-server');
var htmlmin = require('gulp-htmlmin');

var debug = require('gulp-debug');
var uglify = require('gulp-uglify');


gulp.task('html', function () {
	return gulp.src(['*.html', 'components/**/*.html'])
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('dist'));
});

// @ts-ignore
gulp.task('minify-html', ['html'], function () {
	return gulp.src(['./dist/**/*.html', './dist/*.html'])
		.pipe(concat('index.html'))
		.pipe(gulp.dest('./build'));
});

// Compiles SCSS files from /scss into /css
gulp.task('sass', function () {
	return gulp.src(['components/**/*.scss', 'components/*.scss', 'components/**/*.css'])
		// .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Minify compiled CSS
// @ts-ignore
gulp.task('minify-css', ['sass'], function () {
	return gulp.src('dist/*.css')
		// .pipe(sourcemaps.init())
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.reload({
			stream: true
		}))
});


// Minify JS
gulp.task('minify-js', function (cb) {
	return gulp.src(['./components/**/*.js', './components/*.js'])
		// .pipe(debug({ title: 'minify-js:' }))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify().on('error', function (e) {
			console.log(e);
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// Combine js
// @ts-ignore
gulp.task('scripts', ['minify-js'], function () {
	// @ts-ignore
	return gulp.src(['./dist/**/*.js', './dist/*.js'])
		.pipe(concat('main.js'))
		.pipe(gulp.dest('./build/js'));
});


gulp.task('images', function (done) {
	return gulp.src('./img/**/*')
		.pipe(flatten({ includeParents: 1 }))
		.pipe(gulp.dest('build/img'));
});


// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function () {
	gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
		.pipe(gulp.dest('vendor/bootstrap'))

	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
		.pipe(gulp.dest('vendor/jquery'))

	gulp.src([
		'node_modules/font-awesome/**',
		'!node_modules/font-awesome/**/*.map',
		'!node_modules/font-awesome/.npmignore',
		'!node_modules/font-awesome/*.txt',
		'!node_modules/font-awesome/*.md',
		'!node_modules/font-awesome/*.json'
	])
		.pipe(gulp.dest('vendor/font-awesome'))
})



// Run everything
// @ts-ignore
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'scripts', 'html', 'images', 'copy', 'minify-html']);


// Configure the browserSync task
gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: '.',
			middleware: [historyApiFallback()]
		},
		port: 3000
	})
})

// Dev task with browserSync
// @ts-ignore
gulp.task('dev', ['default', 'minify-html', 'browserSync'], function () {
	// @ts-ignore
	gulp.watch(['components/**/*.scss', 'components/*.scss'], ['sass']);
	// @ts-ignore
	gulp.watch('components/**/*.js', ['minify-js']);
	// @ts-ignore
	gulp.watch('components/*.js', ['minify-js']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch(['*.html', 'components/**/*.html'], browserSync.reload);
	gulp.watch('components/**/*.js', browserSync.reload);
});