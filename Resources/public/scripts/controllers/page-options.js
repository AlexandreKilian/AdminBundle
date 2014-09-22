
'use strict';

/**
* @ngdoc function
* @name angularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('pageOptionsCtrl', function($scope,$modalInstance,Page,Slug,element,isNew,types) {

  $scope.page = element;
  $scope.tree = Page.getTree();
  $scope.new = isNew;
  $scope.types = types;

  $scope.$watch('page.parent',function(newParent,oldParent){
    if(newParent != undefined && (oldParent == undefined || newParent.id != oldParent.id)){
      // parent = getTreeElement(newParent,$scope.tree);
        $scope.page.url = newParent.url + "/" + Slug.slugify($scope.page.name);
    }

  });

  $scope.selectParentPage = function(page){
    console.log(page);
    $scope.page.parent = page;
  }

  $scope.ok = function () {
    var page = $scope.page;
    if($scope.page.parent != undefined)page.parent = $scope.page.parent.id;

    $modalInstance.close(page);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
