var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var fileExists = require('file-exists');
var rename = require('gulp-rename');
var bower = require('gulp-bower');
var inject = require('gulp-inject');

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
    var devAssets = gulp.src([].concat(cssFiles, jsFiles));

    return gulp
        .src('./index.html')
        .pipe(inject(devAssets, {relative: true}))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('build-css', function () {
    return gulp
        .src(cssFiles)
        .pipe(concat('eole.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/css/'))
    ;
});

gulp.task('build-js', function () {
    return gulp
        .src(jsFiles)
        .pipe(concat('eole.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'))
    ;
});

gulp.task('build-fonts', function () {
    return gulp
        .src(fontFiles)
        .pipe(gulp.dest('./assets/fonts/'))
    ;
});

gulp.task('deploy', gulpsync.sync([
    ['copy-environment-file', 'install-bower-dependencies'],
    'assets'
]));

gulp.task('deploy-prod', gulpsync.sync([
    ['check-environment-file', 'install-bower-dependencies'],
    'assets-prod'
]));

gulp.task('install-bower-dependencies', function () {
    return bower({ cmd: 'install'});
});

gulp.task('check-environment-file', function () {
    if (!fileExists('./config/environment.js')) {
        throw 'You must create your config/environment.js file from config/environment.js.dist';
    }
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

gulp.task('default', function () {
});

var cssFiles = [
    'bower_components/bootstrap/dist/css/bootstrap.min.css',
    'eole/chat/css/chat.css',
    'eole/common/css/all.css',

    'eole/games/tictactoe/css/tictactoe.css',
    'eole/games/tictactoe/css/layout.css',

    'eole/games/awale/css/awale.css',

    'eole/games/monkeys/css/card.css',
    'eole/games/monkeys/css/monkeys.css'
];

var jsFiles = [
    'bower_components/cryptojslib/rollups/sha1.js',
    'bower_components/cryptojslib/rollups/sha512.js',
    'bower_components/cryptojslib/components/enc-base64-min.js',
    'bower_components/cryptojs-password-encoder/CryptoJsPasswordEncoder.js',
    'bower_components/autobahn-old/autobahn.min.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-locker/dist/angular-locker.min.js',
    'bower_components/angular-translate/angular-translate.min.js',
    'bower_components/angular-sanitize/angular-sanitize.min.js',
    'bower_components/angular-route/angular-route.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap.min.js',
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    'bower_components/tv4/tv4.js',
    'bower_components/objectpath/lib/ObjectPath.js',
    'bower_components/angular-schema-form/dist/schema-form.min.js',
    'bower_components/angular-schema-form/dist/bootstrap-decorator.min.js',

    'eole_components/relative-path/relative-path.js',
    'eole_components/eole-api-client/eole-api-client.js',
    'eole_components/eole-api-client/eole-api-client-mock.js',
    'eole_components/eole-api-client/ng-module.js',
    'eole_components/eole-websocket-client/eole-websocket-client.js',
    'eole_components/eole-websocket-client/eole-websocket-client-mock.js',
    'eole_components/eole-websocket-client/ng-module.js',

    'config/environment.js',

    'eole/module.js',
    'eole/common/config/html5-mode.js',
    'eole/common/config/locker.js',
    'eole/common/service/party-manager.js',
    'eole/common/service/eole-session.js',
    'eole/common/service/websocket.js',
    'eole/common/translations/module.js',
    'eole/common/translations/config.js',
    'eole/common/translations/schema-form.js',
    'eole/common/translations/en.js',
    'eole/common/translations/fr.js',
    'eole/menu/module.js',
    'eole/menu/controllers/menu.js',
    'eole/home/module.js',
    'eole/home/routes.js',
    'eole/home/controllers/home.js',
    'eole/player/module.js',
    'eole/player/routes.js',
    'eole/player/controllers/login.js',
    'eole/player/controllers/profile.js',
    'eole/player/controllers/register.js',
    'eole/game/module.js',
    'eole/game/routes.js',
    'eole/game/controllers/game.js',
    'eole/game/controllers/games.js',
    'eole/default-game/module.js',
    'eole/default-game/routes.js',
    'eole/default-game/controllers/party.js',
    'eole/chat/module.js',
    'eole/chat/routes.js',
    'eole/chat/controllers/chat.js',

    'eole/games/tictactoe/module.js',
    'eole/games/tictactoe/routes.js',
    'eole/games/tictactoe/controllers/tictactoe.js',
    'eole/games/tictactoe/translations/en.js',
    'eole/games/tictactoe/translations/fr.js',

    'eole/games/awale/module.js',
    'eole/games/awale/routes.js',
    'eole/games/awale/model/seeds.js',
    'eole/games/awale/services/grid-manager.js',
    'eole/games/awale/services/anim-highlight.js',
    'eole/games/awale/controllers/awale.js',
    'eole/games/awale/translations/en.js',
    'eole/games/awale/translations/fr.js',

    'eole/games/monkeys/module.js',
    'eole/games/monkeys/routes.js',
    'eole/games/monkeys/service/monkeys-api.js',
    'eole/games/monkeys/service/croupier.js',
    'eole/games/monkeys/controllers/party.js'
];

var fontFiles = [
    'bower_components/bootstrap/dist/fonts/*.*'
];
