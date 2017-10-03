var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	imagemin = require('gulp-imagemin'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require("gulp-rename"),
	cleanCSS = require('gulp-clean-css'), // Ex minify-css
	browserSync = require('browser-sync').create(); 

var paths = {
	// Source
	srcSass: 'sass/*.sass',
	srcJs: 'js/*.js',
	srcImg: 'img/*',
	// Destination
	destSass: 'build/css',
	destJs: 'build/js',
	destImg: 'build/img',
};

// Scripts task
// Uglifies
gulp.task('scripts', function () {

	// Uncompressed all JS file
	gulp.src(paths.srcJs)
	.pipe(sourcemaps.init())
	.pipe(concat('all.js'))
	.on('error', console.error.bind(console))
	.pipe(sourcemaps.write('maps'))		
	.pipe(gulp.dest(paths.destJs));
	
	// Compressed all JS file
	gulp.src('build/js/all.js')	
	.pipe(sourcemaps.init())
	.pipe(rename("all.min.js"))		
	.pipe(uglify())
	.on('error', console.error.bind(console))
	.pipe(sourcemaps.write('maps'))		
	.pipe(gulp.dest(paths.destJs));
});

// Styles Task
// Convert sass to css and then generates a minified css file
gulp.task('styles', function () {
	
	// Uncompressed main CSS file
	gulp.src(paths.srcSass)
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(autoprefixer('last 2 versions','> 1%'))
	.on('error', console.error.bind(console))
	.pipe(sourcemaps.write('maps'))		
	.pipe(gulp.dest(paths.destSass));
	
	// Compressed main CSS file
	gulp.src('build/css/main.css')	
	.pipe(sourcemaps.init())
	.pipe(cleanCSS())
	.pipe(rename("main.min.css"))		
	.on('error', console.error.bind(console))		
	.pipe(sourcemaps.write('maps'))		
	.pipe(gulp.dest(paths.destSass));
});

// Image Task
// Compress all images
gulp.task('images', function () {
	gulp.src(paths.srcImg)
	.pipe(imagemin())
	.pipe(gulp.dest(paths.destImg));
});

// Watch task
// watches js and css and rebuild everytime files are saved
gulp.task('watch', function () {
	gulp.watch(['js/*.js'], ['scripts', browserSync.reload]);
	gulp.watch(['sass/*.sass'], ['styles', browserSync.reload]);
	gulp.watch(['img/*'], ['images', browserSync.reload]);
	gulp.watch(['./*.html'], [browserSync.reload]);
});

gulp.task('default', [
	'scripts',
	'styles',
	'watch',
	'browser-sync'
]);

gulp.task('browser-sync', function(){
	browserSync.init({
		proxy: "snippets.dev/gulp-project"
	});
})