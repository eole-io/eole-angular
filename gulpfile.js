var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var fileExists = require('file-exists');
var rename = require('gulp-rename');
var bower = require('gulp-bower');
var inject = require('gulp-inject');

var eoleAssets = require('./index.assets.js');

gulp.task('assets', [
    'inject-assets'
]);

gulp.task('assets-prod', [
    'build-assets',
    'inject-assets-prod'
]);

gulp.task('build-assets', [
    'build-css',
    'build-js',
    'build-fonts'
]);

gulp.task('inject-assets-prod', function () {
    var distAssets = gulp.src([
        './assets/css/*.css',
        './assets/js/*.js'
    ]);

    return gulp
        .src('./index.html')
        .pipe(inject(distAssets, {relative: true}))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('inject-assets', function () {
    var devAssets = gulp.src([].concat(eoleAssets.css, eoleAssets.js));

    return gulp
        .src('./index.html')
        .pipe(inject(devAssets, {relative: true}))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('build-css', function () {
    return gulp
        .src(eoleAssets.css)
        .pipe(concat('eole.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/css/'))
    ;
});

gulp.task('build-js', function () {
    return gulp
        .src(eoleAssets.js)
        .pipe(concat('eole.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'))
    ;
});

gulp.task('build-fonts', function () {
    return gulp
        .src(eoleAssets.fonts)
        .pipe(gulp.dest('./assets/fonts/'))
    ;
});

gulp.task('deploy', gulpsync.sync([
    ['copy-environment-file', 'copy-index-html', 'install-bower-dependencies'],
    'assets'
]));

gulp.task('deploy-prod', gulpsync.sync([
    ['copy-environment-file', 'copy-index-html', 'install-bower-dependencies'],
    'assets-prod'
]));

gulp.task('install-bower-dependencies', function () {
    return bower({ cmd: 'install'});
});

gulp.task('copy-environment-file', function () {
    if (!fileExists('./config/environment.js')) {
        return gulp
            .src('./config/environment.js.dist')
            .pipe(rename('environment.js'))
            .pipe(gulp.dest('./config/'))
        ;
    }
});

gulp.task('copy-index-html', function () {
    if (!fileExists('./index.html')) {
        return gulp
            .src('./index.html.dist')
            .pipe(rename('index.html'))
            .pipe(gulp.dest('./'))
        ;
    }
});

gulp.task('default', function () {
});
