
'use strict';

/**
* @ngdoc function
* @name angularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('entitySelect',function($scope, $modalInstance,Entity,type) {

    $scope.entity = {};

    var init = function(){
        $scope.entities = Entity.getEntities({type:type});
    }



  $scope.ok = function () {
      $modalInstance.close($scope.entity);

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };



  init();

});
