
'use strict';

/**
* @ngdoc function
* @name angularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('blockElementCtrl',function($scope, $modalInstance,Block,block,element,isNew) {

    $scope.childTypes = ["widget","block"];
    $scope.childType = 'widget';

    var init = function(){
        Block.getTypes({id:block.id}).$promise.then(function(types){
            $scope.widgetTypes = types;
        });
    }

  $scope.ok = function () {
    if($scope.childType=='widget'){
        Block.addWidget({id:block.id,type:$scope.widgetType.id}).$promise.then(function(widget){
            $modalInstance.close(widget);
        });
    } else {
        Block.addBlock({id:block.id,name:$scope.blockName}).$promise.then(function(subblock){
            $modalInstance.close(subblock);
        });
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


  init();

});
