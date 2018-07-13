const
	gulp = require('gulp'),
	watch = require('gulp-watch'),
	rollup = require('gulp-better-rollup'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('rollup-plugin-babel'),
	browserSync = require('browser-sync');

const serverConfig = {
	server: {
		baseDir: './dist'
	},
	tunnel: true,
	port: 9000
};

gulp.task('server', () => {
	browserSync(serverConfig);
});

gulp.task('html', () => {
	gulp.src('dev/index.html')
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('js', () => {
	gulp.src('dev/js/main.js')
		.pipe(sourcemaps.init())
		// note that UMD and IIFE format requires `name` but it will be inferred from the source file name `mylibrary.js`
		.pipe(rollup({plugins: [babel()]}, 'iife'))
		// save sourcemap as separate file (in the same folder)
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('dist/js'));

	gulp.src('dev/js/eRates.js')
		.pipe(gulp.dest('dist/js'));

  browserSync.reload({
		stream: true
	});

});


// gulp.task('js', () => {
// 	gulp.src('dev/js/*.js')
// 		.pipe(gulp.dest('dist/js/'))
// 		.pipe(browserSync.reload({
// 			stream: true
// 		}))
// });

gulp.task('css', () => {
	gulp.src('dev/css/*.css')
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('img', () => {
	gulp.src('dev/img/**/*')
		.pipe(gulp.dest('dist/img/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});


gulp.task('watch', () => {
  gulp.watch('dev/index.html', ['html']);
  gulp.watch('dev/js/**/*.js', ['js']);
  gulp.watch('dev/css/**/*.css', ['css']);
  gulp.watch('dev/img/**/*', ['img']);
});

gulp.task('build', ['html', 'js', 'css', 'img']);

gulp.task('default', ['build', 'server', 'watch']);