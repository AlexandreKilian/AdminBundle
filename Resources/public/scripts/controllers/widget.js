'use strict';

/**
* @ngdoc function
* @name angularApp.controller:BlockCtrl
* @description
* # BlockCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('WidgetCtrl', [ '$scope','$rootScope','$timeout','$modal','$upload', 'Entity', function ($scope, $rootScope,$timeout, $modal,$upload, Entity) {

    $scope.typeid;
    $scope.widgetid;
    $scope.widget = {};
    $scope.editMode = false;
    $scope.previewMode = false;

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
    var updateEntity = function(entity){
        $scope.widget = entity;
    };

    $scope.selectModel = function(){

        var type = $scope.typeid;

        var modalInstance = $modal.open({
            templateUrl: 'entityModal.html',
            controller: 'entitySelect',
            resolve: {

                type: function(){
                    return type;
                }
            }

        });
        modalInstance.result.then(function (entity) {
          Entity.setEntity({id:$scope.widgetid,entity:entity.id},null);
        });
    }


    $scope.onFileSelect = function($files,field) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: window.brix.routing.media_upload,
                file: file
            }).progress(function(evt){
            }).success(function(data, status, headers, config) {
                $timeout(function(){
                    $scope.$apply(function(){
                        $scope.widget[field] = data;
                        $scope.saveEntity();
                    });
                })

            });
        }
    };
    $scope.openMediaGallery = function(field){
        var modalInstance = $modal.open({
            templateUrl: 'mediaGalleryModal.html',
            controller: 'mediaGallery',
            resolve: {
            }

        });
        modalInstance.result.then(function (media) {
          $scope.widget[field] = media;
        });

    }

    $scope.switchToEdit = function(){
        $rootScope.$broadcast('toggleMode',{editMode: true});
    }

    //Scope Functions
    $scope.saveEntity = function(){
        var entity = {};
        for(var i in $scope.widget){
            if(i == "id" || i == "$resolved")continue;//Don't send the ID, It's not part of the Form
                if(typeof $scope.widget[i] ==='object'){
                    entity[i] = $scope.widget[i].id;
                    continue;
                }
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

        init();

    }]);
