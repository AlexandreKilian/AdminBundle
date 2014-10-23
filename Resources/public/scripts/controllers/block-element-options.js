
'use strict';

/**
* @ngdoc function
* @name angularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('blockElementCtrl',function($scope, $rootScope, $modalInstance,Block,block,element,isNew) {

    $scope.childTypes = ["widget","block"];
    $scope.childType = 'widget';
    $scope.data = {widgetType:null,childType:'widget'};

    var init = function(){
        Block.getTypes({id:block.id}).$promise.then(function(types){
            $scope.widgetTypes = types;
        });
    }

    $scope.$watch('data.widgetType',updateWidgetType,true);

  $scope.ok = function () {
    if($scope.data.childType=='widget'){
        Block.addWidget({id:block.id,type:$scope.data.widgetType.id}).$promise.then(function(widget){
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

  var updateWidgetType = function(oldType,newType){
      console.log(oldType,newType);
  };


  init();

});
