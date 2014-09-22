'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:BlockCtrl
 * @description
 * # BlockCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('WidgetCtrl', [ '$scope','$rootScope', 'Entity', function ($scope, $rootScope, Entity) {

    $scope.typeid;
    $scope.widgetid;
    $scope.widget = {};
    $scope.editMode = false;
    $scope.previewMode = true;

    //Internal Functions

    var init = function(){
      $scope.$watch("typeid",loadTemplate);
      $scope.$watch("widgetid",loadEntity);
    }

    var loadTemplate = function(){
      $scope.template = window.brix.routing.template + "/" + $scope.typeid;
    }

    var loadEntity = function(){
      Entity.get({id:$scope.widgetid}).$promise.then(updateEntity);

    }

    $rootScope.$on('toggleMode',function(evt,args){
      $scope.editMode = args.editMode;
      $scope.previewMode = args.previewMode;
    });
    $rootScope.$on('saveWidgets',function(evt,args){
      $scope.saveEntity();
    });
    $rootScope.$on('resetWidgets',function(evt,args){
      $scope.updateEntity();
    });

    var updateEntity = function(entity){
      $scope.widget = entity;
    };

    $scope.switchToEdit = function(){
      $rootScope.$broadcast('toggleMode',{editMode: true});
    }

    //Scope Functions
    $scope.saveEntity = function(){
      var entity = {};
      for(var i in $scope.widget){
        if(i == "id")continue;//Don't send the ID, It's not part of the Form
        entity[i] = $scope.widget[i];
      }
      Entity.set({id: $scope.widgetid},entity).$promise.then(updateEntity);
    }

    $scope.updateEntity = function(){
      loadEntity();
    }

    $scope.templateUrl = function(){
      return $scope.template;
    }

    init();

  }]);
