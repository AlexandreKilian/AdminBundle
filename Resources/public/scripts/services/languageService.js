'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BlockCtrl
 * @description
 * # BlockCtrl
 * Controller of the angularApp
 */
angular.module('brixServices')
  .factory('Language', ['$resource',function($resource){
    return $resource(window.brix.routing.languages,null,{
      get: {
        method: 'GET',
        isArray: true
      }
    });
  }]);
