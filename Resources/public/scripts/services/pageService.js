'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BlockCtrl
 * @description
 * # BlockCtrl
 * Controller of the angularApp
 */
angular.module('brixServices')
  .factory('Page', ['$resource',function($resource){
    return $resource(window.brix.routing.page,{id:'@id'},{
      get: {
        method: 'GET'
      },
      set: {
        method: 'POST',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      },
      getTypes: {
        url: window.brix.routing.page_types,
        method: 'GET',
        isArray: true,
        headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      },
      getTree: {
        url: window.brix.routing.page_tree,
        method: 'GET',
        isArray: true
      }
    });
  }]);
