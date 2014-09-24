'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular.module('brixServices',['ngResource']);

angular
  .module('angularApp', [
    // 'ngAnimate',
    // 'ngCookies',
    'ngResource',
    // 'ngRoute',
    'ngSanitize',
    // 'ngTouch',
    // 'ui.sortable',
    'ui.bootstrap',
    'contenteditable',
    'angular-medium-editor',
    'brixServices',
    'slugifier',
    'ng-context-menu',
    'angularFileUpload'
  ])
  .config(function ($sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist([
     // Allow same origin resource loads.
     'self',
     // Allow loading from our assets domain.  Notice the difference between * and **.
     'http://brix.loc/**'
   ]);
  });
