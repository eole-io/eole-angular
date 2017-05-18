var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var fileExists = require('file-exists');
var rename = require('gulp-rename');
var bower = require('gulp-bower');
var inject = require('gulp-inject');
var eole = require('.');

var eoleAssets = eole.getAllAssets();

gulp.task('assets', gulpsync.sync([
    'copy-index-html',
    'inject-assets'
]));

gulp.task('assets-prod', gulpsync.async([
    [
        'copy-images-fonts-assets'
    ],
    [
        ['build-assets', 'copy-index-html'],
        'inject-assets-prod'
    ]
]));

gulp.task('build-assets', gulpsync.async([
    'build-css',
    'build-js'
]));

gulp.task('inject-assets-prod', function () {
    var distAssets = gulp.src([
        './assets/css/*.css',
        './assets/js/*.js'
    ]);

    return gulp
        .src('./index.html')
        .pipe(inject(distAssets, {relative: true, removeTags: true}))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('copy-images-fonts-assets', function () {
    eoleAssets.files.forEach(function (value) {
        if (typeof value === 'string' || value instanceof String) {
            gulp
                .src(value)
                .pipe(gulp.dest('./assets/'))
            ;
        } else {
            gulp
                .src(value[0])
                .pipe(gulp.dest('./assets/'+value[1]))
            ;
        }
    });
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
        .pipe(cleanCSS({
            relativeTo: '../..',
            target: '.'
        }))
        // concat only after minification to rebase correctly url path
        .pipe(concat('eole.min.css'))
        .pipe(gulp.dest('./assets/css/'))
    ;
});

gulp.task('build-js', function () {
    return gulp
        .src(eoleAssets.js)
        .pipe(ngAnnotate())
        .pipe(concat('eole.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'))
    ;
});

gulp.task('deploy', gulpsync.sync([
    ['copy-environment-file', 'install-bower-dependencies'],
    'assets'
]));

gulp.task('deploy-prod', gulpsync.sync([
    ['copy-environment-file', 'install-bower-dependencies'],
    'assets-prod'
]));

gulp.task('install-bower-dependencies', function () {
    return bower({cmd: 'install'});
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
    return gulp
        .src('./index.html.dist')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('default', function () {
});
