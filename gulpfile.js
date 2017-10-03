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
	rev = require('gulp-rev'),
	del = require('del'),
	browserSync = require('browser-sync').create(); 

var paths = {
	// Source
	srcSass: 'resources/sass/*.sass',
	srcJs: 'resources/js/*.js',
	srcImg: 'resources/img/*',

	// Destination
	destCss: 'static/css',
	destJs: 'static/js',
	destImg: 'static/img',
}
var expandedFiles = {
	css : 'styles.css',
	js : 'all.js',
};
var compressedFiles = {
	css : 'styles.min.css',
	js : 'all.min.js',
};

// Scripts task
// Uglifies
gulp.task('scripts', function () {
	// Uncompressed all JS file
	gulp.src(paths.srcJs)
	.pipe(sourcemaps.init())
	.pipe(concat(expandedFiles.js))
	.pipe(sourcemaps.write('maps'))		
	.pipe(gulp.dest(paths.destJs))
	.on('error', console.error.bind(console));

});

gulp.task('scripts-compressed', ['scripts'], function () {	
	// Compressed all JS file
	gulp.src(paths.destJs + '/' + expandedFiles.js)	
	.pipe(sourcemaps.init())
	.pipe(rename(compressedFiles.js))		
	.pipe(uglify())	
	.pipe(rev())	
	.pipe(sourcemaps.write('maps'))		
	.pipe(gulp.dest(paths.destJs))
	.pipe(rev.manifest())			
	.pipe(gulp.dest(paths.destJs))
	.on('error', console.error.bind(console));
});

// Styles Task
// Convert sass to css and then generates a minified css file
gulp.task('styles', function () {
	
	// Uncompressed main CSS file
	gulp.src(paths.srcSass)
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded'
	}).on('error', console.error.bind(console)))
	.pipe(concat(expandedFiles.css))	
	.pipe(autoprefixer('last 2 versions','> 1%'))	
	.pipe(sourcemaps.write('./'))	
	.pipe(gulp.dest(paths.destCss))
	.pipe(sourcemaps.init())
	.pipe(cleanCSS())
	.pipe(rename({
		basename: "styles",
		suffix: ".min",
		extname: ".css"
	}))		
	.pipe(rev())		
	.pipe(sourcemaps.write('./'))		
	.pipe(gulp.dest(paths.destCss))
	.pipe(rev.manifest())			
	.pipe(gulp.dest(paths.destCss));
});

// Image Task
// Compress all images
gulp.task('images', function () {
	gulp.src(paths.srcImg)
	.pipe(imagemin())
	.pipe(gulp.dest(paths.destImg));
});
gulp.task('clean', function () {
	return  del([
		'static/*'
	]);
});
// Watch task
// watches js and css and rebuild everytime files are saved
gulp.task('watch', function () {
	gulp.watch([paths.srcJs], ['scripts', browserSync.reload]);
	gulp.watch([paths.srcSass], ['styles', browserSync.reload]);
	gulp.watch(['./*.html'], browserSync.reload);
});

gulp.task('default', ['clean'], function(){
	gulp.start(['scripts', 'styles', /*'images',*/ 'watch', 'browser-sync']);
});

gulp.task('browser-sync', function(){
	browserSync.init({
		proxy: "snippets.dev/gulp-project",
	});
})