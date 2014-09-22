'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BlockCtrl
 * @description
 * # BlockCtrl
 * Controller of the angularApp
 */
angular.module('brixServices')
  .factory('Entity', ['$resource',function($resource){
    return $resource(window.brix.routing.entity,{id:'@id'},{
      get: {
        method: 'GET'
      },
      set: {
        method: 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      }
    });
  }]);
