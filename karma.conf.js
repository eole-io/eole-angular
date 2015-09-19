// Karma configuration
// Generated on Mon Sep 28 2015 14:21:18 GMT+0200 (Paris, Madrid (heure d’été))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      // Application scripts
      'bower_components/cryptojslib/rollups/sha1.js',
      'bower_components/cryptojslib/rollups/sha512.js',
      'bower_components/cryptojslib/components/enc-base64-min.js',
      'bower_components/autobahn/autobahn.min.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-locker/dist/angular-locker.min.js',
      'bower_components/angular-translate/angular-translate.min.js',
      'bower_components/angular-wamp/release/angular-wamp.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-route/angular-route.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'bower_components/tv4/tv4.js',
      'bower_components/objectpath/lib/ObjectPath.js',
      'bower_components/angular-schema-form/dist/schema-form.min.js',
      'bower_components/angular-schema-form/dist/bootstrap-decorator.min.js',
      'eole_components/eole-api-client/eole-api-client.js',
      'eole_components/eole-api-client/ng-module.js',
      'ng-eole/ng-eole.js',
      'ng-eole/session/eole-session.js',
      'ng-eole/translations/config.js',
      'ng-eole/translations/schema-form.js',
      'ng-eole/translations/en.js',
      'ng-eole/translations/fr.js',
      'ng-eole/menu/MenuController.js',
      'ng-eole/home/home.js',
      'ng-eole/player/login.js',
      'ng-eole/player/register.js',
      'ng-eole/player/perso.js',

      // Tests scripts
      'bower_components/angular-mocks/angular-mocks.js',
      'tests/*.js',
      'tests/**/*.js',
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
