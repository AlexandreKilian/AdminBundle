'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BlockCtrl
 * @description
 * # BlockCtrl
 * Controller of the angularApp
 */
angular.module('brixServices')
  .factory('Block', ['$resource',function($resource){
    return $resource(window.brix.routing.block,{id:'@id'},{
      get: {
        method: 'GET'
      },
      getTypes: {
        url: window.brix.routing.block_types,
        method: 'GET',
        isArray: true
      },
      addWidget: {
        url: window.brix.routing.block_add_widget,
        method: 'PUT'
      },
      addBlock: {
          url: window.brix.routing.block_add_block,
          method: 'PUT'
      },
      set: {
        method: 'POST'
      },
      deleteChild:{
        url: window.brix.routing.block_remove_widget,
        method: 'POST'
      }
    });
  }]);
