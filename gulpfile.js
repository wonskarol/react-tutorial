var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    browserify({
        entries: 'src/index.js',
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);