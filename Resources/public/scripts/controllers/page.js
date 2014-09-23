'use strict';

/**
* @ngdoc function
* @name angularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('pageCtrl', function ($scope,$rootScope,$timeout,$modal,Page) {

  $scope.pageid = 0;
  $scope.new = true;

  $scope.element = {};

  $scope.editMode = false;
  $scope.previewMode = true;

  $scope.showElementOptions = false;

  var editElement = {};

  $scope.hideAdminBar = false;
  var types = Page.getTypes();


  $scope.togglePreview = function(){
    $scope.previewMode = !$scope.previewMode;
    toggleMode();
  }

  $scope.toggleEdit = function(){
    $scope.editMode = !$scope.editMode;
    toggleMode();
  }

  $rootScope.$on('editBlockElement',function(evt,data){
    openElementOptions(data);
  });

  $scope.saveOptions = function(data){
    editElement.element = $scope.element;
    $rootScope.$broadcast('saveBlockElement',editElement);
    editElement = {};
  }


  $scope.openMediaGallery = function(field){
      var modalInstance = $modal.open({
          templateUrl: 'mediaGalleryModal.html',
          controller: 'mediaGallery',
          resolve: {
          }

      });
      modalInstance.result.then(function (media) {
      });

  }


  $scope.toggleHide = function(){
    $scope.hideAdminBar = !$scope.hideAdminBar;
  }

  var toggleMode = function(){
    $rootScope.$broadcast('toggleMode',{editMode: $scope.editMode,previewMode:$scope.previewMode});
  }

  $rootScope.$on('toggleMode',function(evt,args){
    $scope.editMode = args.editMode;
    $scope.previewMode = args.previewMode;
  });

  $scope.save = function(){
    $rootScope.$broadcast('saveWidgets');
    $scope.toggleEdit();
  }

  $scope.reset = function(){
    $rootScope.$broadcast('resetWidgets');
    $scope.toggleEdit();
  }

  $scope.contentManager = function(){
    var modalInstance = $modal.open({
      templateUrl: 'contentModal.html',
      controller: 'contentCtrl',
      resolve: {
      }

    });
  }

  $scope.pageOptions = function(){
    var modalInstance = $modal.open({
      templateUrl: 'pageSettingsModal.html',
      controller: 'pageOptionsCtrl',
      resolve: {
        element: function(){
          return $scope.page;
        },
        isNew: function(){
          return false;
        },
        types: function(){
          return types;
        }
      }

    });
    modalInstance.result.then(function (page) {
      var id = page.id;
      delete page.id;
      delete page.blocks;
      delete page.children;
      Page.set({id:id},page);
    }, function () {
    });

  };


  $scope.createPage = function(url){
    $scope.newPageOptions(url)
  }

  $scope.newPageOptions = function(url){
    var modalInstance = $modal.open({
      templateUrl: 'pageSettingsModal.html',
      controller: 'pageOptionsCtrl',
      resolve: {
        element: function(){
          return {url: url};
        },
        isNew: function(){
          return true;
        },
        types: function(){
          return types;
        }
      }

    });

    modalInstance.result.then(function (page) {
      Page.set(page);
    });
  };

  var init = function(){
    $scope.$watch('pageid',loadPage);
  }



  var loadPage = function(pageid){
    Page.get({id:pageid}).$promise.then(function(page){
      $scope.new = false;
      $scope.page = page;
    });
  }
  init();
});
