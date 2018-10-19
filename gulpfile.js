var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var historyApiFallback = require('connect-history-api-fallback');
var concat = require('gulp-concat');
var http = require('http-server');
var htmlmin = require('gulp-htmlmin');



gulp.task('html', function () {
	return gulp.src(['*.html', 'components/**/*.html'])
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(concat('templates.html'))
		.pipe(gulp.dest('dist'));
});

// gulp.task('minify-html', ['html'], function () {
// 	return gulp.src(['./dist/**/*.html', './dist/*.html'])
// 		.pipe(concat('index.html'))
// 		.pipe(gulp.dest('./build'));
// });

// Compiles SCSS files from /scss into /css
gulp.task('sass', function () {
	//	var info = autoprefixer().info();
	return gulp.src(['components/**/*.scss', 'components/*.scss', 'components/**/*.css'])
		// .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		// .pipe(sourcemaps.write())
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		// .pipe(rename({ suffix: '.min' }))
		.pipe(concat('main.min.css'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// // Minify compiled CSS
// gulp.task('minify-css', ['sass'], function () {
// 	return gulp.src('dist/*.css')
// 		// .pipe(sourcemaps.init())
// 		.pipe(cleanCSS({
// 			compatibility: 'ie8'
// 		}))
// 		.pipe(rename({
// 			suffix: '.min'
// 		}))
// 		// .pipe(sourcemaps.write())
// 		.pipe(gulp.dest('build/css'))
// 		.pipe(browserSync.reload({
// 			stream: true
// 		}))
// });


// Minify JS
gulp.task('minify-js', function () {
	return gulp.src(['components/**/*.js', 'components/*.js'])
		// .pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify().on('error', function (e) {
			console.log(e);
		}))
		// .pipe(rename({
		// 	suffix: '.min'
		// }))
		// .pipe(sourcemaps.write())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

// // Combine js
// gulp.task('scripts', ['minify-js'], function () {
// 	return gulp.src(['./dist/**/*.js', './dist/*.js'])
// 		.pipe(concat('main.min.js'))
// 		.pipe(gulp.dest('./build/js'));
// });




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
gulp.task('default', ['sass', 'minify-js', 'html', 'copy']);


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
gulp.task('dev', ['browserSync', 'sass', 'minify-js', 'html'], function () {
	gulp.watch(['components/**/*.scss', 'components/*.scss'], ['sass']);
	gulp.watch('components/**/*.js', ['minify-js']);
	gulp.watch('components/*.js', ['minify-js']);
	// Reloads the browser whenever HTML or JS files change
	gulp.watch(['*.html', 'components/**/*.html'], browserSync.reload);
	gulp.watch('components/**/*.js', browserSync.reload);
});