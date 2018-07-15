const
	gulp = require('gulp'),
	express = require('express'),
	mongoose = require('mongoose'),
	watch = require('gulp-watch'),
	rollup = require('gulp-better-rollup'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('rollup-plugin-babel');
	// browserSync = require('browser-sync');

// const serverConfig = {
// 	server: {
// 		baseDir: './dist'
// 	},
// 	tunnel: true,
// 	port: 9000
// };

const app = express();
const port = 5000;

//

gulp.task('server', () => {
	app.listen(port, () => {
		console.log(`Server started on port ${port}`);
	})
});

gulp.task('database', () => {
	mongoose.connect('mongodb://localhost:27017/albums-dev', {
		useNewUrlParser: true
	})
		.then(() => {console.log('Data base connected...')})
		.catch(err => console.log(err));
});

gulp.task('html', () => {
	gulp.src('dev/index.html')
		.pipe(gulp.dest('dist/'))
		// .pipe(browserSync.reload({
		// 	stream: true
		// }))
});

gulp.task('js', () => {
	gulp.src('dev/js/main.js')
		.pipe(sourcemaps.init())
		// note that UMD and IIFE format requires `name` but it will be inferred from the source file name `mylibrary.js`
		.pipe(rollup({plugins: [babel()]}, 'iife'))
		// save sourcemap as separate file (in the same folder)
		.pipe(sourcemaps.write(''))
		.pipe(gulp.dest('dist/js'));
		// .pipe(browserSync.reload({
		// 	stream: true
		// }));

	gulp.src('dev/js/eRates.js')
		.pipe(gulp.dest('dist/js'))
		// .pipe(browserSync.reload({
		// 	stream: true
		// }));
});

gulp.task('css', () => {
	gulp.src('dev/css/*.css')
		.pipe(gulp.dest('dist/css/'))
		// .pipe(browserSync.reload({
		// 	stream: true
		// }))
});

gulp.task('img', () => {
	gulp.src('dev/img/**/*')
		.pipe(gulp.dest('dist/img/'))
		// .pipe(browserSync.reload({
		// 	stream: true
		// }))
});

gulp.task('render', ()=> {
	app.use(express.static('dist'));  //указываем директорию для статических файлов
  app.get('/', (req, res) => {
    res.sendFile('dist/index.html', { root : __dirname});
  });
});


gulp.task('watch', () => {
  gulp.watch('dev/index.html', ['html']);
  gulp.watch('dev/js/**/*.js', ['js']);
  gulp.watch('dev/css/**/*.css', ['css']);
  gulp.watch('dev/img/**/*', ['img']);
});

gulp.task('build', ['html', 'js', 'css', 'img']);

gulp.task('default', ['build', 'server', 'database', 'render', 'watch']);