// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-03-10 using
// generator-karma 0.9.0

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-scroll-glue/src/scrollglue.js',
      'bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.js',
      'bower_components/angular-nanoscroller-13/scrollable.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/ng-embed/src/ng-embed.js',
      'bower_components/ng-emoticons/src/ng-emoticons.js',
      'bower_components/velocity/velocity.js',
      'bower_components/velocity/velocity.ui.js',
      'bower_components/moment/moment.js',
      'bower_components/lumx/dist/lumx.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage', 'html', 'junit'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/scripts/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {

      reporters: [
        {type: 'html'},
        {type: 'cobertura', subdir: '../../../../../shippable/codecoverage'}
      ]
    },

    htmlReporter: {
      outputDir: 'karma_html', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false // simply replaces spaces with _ for files/dirs
    },

    junitReporter: {
      outputFile: '../../../../shippable/testresults/test-results.xml',
      suite: ''
    },

      // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage',
      'karma-html-reporter',
      'karma-junit-reporter'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
