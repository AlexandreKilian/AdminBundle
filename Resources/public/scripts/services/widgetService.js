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
    },
    getEntities: {
        method: 'GET',
        url: window.brix.routing.widget_entities,
        isArray: true,
    },
    setEntity: {
        method: 'POST',
        url: window.brix.routing.widget_set_entity
    }
    });
  }]);
