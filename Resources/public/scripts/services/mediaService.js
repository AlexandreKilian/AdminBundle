'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BlockCtrl
 * @description
 * # BlockCtrl
 * Controller of the angularApp
 */
angular.module('brixServices')
  .factory('Media', ['$resource',function($resource){
    return $resource(window.brix.routing.media_get,{id:'@id'},{
      get: {
        method: 'GET',
        isArray: true
      },
    });
  }]);
