
'use strict';

/**
* @ngdoc function
* @name angularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('pageOptionsCtrl', function($scope,$modalInstance,Language,Page,Slug,element,isNew,types) {



  $scope.$watch('page.parent',function(newParent,oldParent){
    if(newParent != undefined && (oldParent == undefined || newParent.id != oldParent.id)){
        var newUrl = "";
        if(newParent.url != undefined){
            newUrl += newParent.url + "/";
        }
        $scope.page.url =  newUrl + Slug.slugify($scope.page.name);
    }

  });

  var buildTree = function(pages){
      for(var i in pages){
          var page = pages[i];
          if(page.id == undefined)continue;
          page.displayname ="";
          for(var j = 0; j<page.level;j++){
              page.displayname+="-";
          }
          page.displayname+=" " +page.name;
          $scope.tree.push(page);
          if(page.children != undefined && page.children.length > 0){
              buildTree(pages[i].children);
          }

      }
  }

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

  var init = function(){
      $scope.page = element;
      $scope.tree = [];
      Page.getTree(function(pages){
          console.log(pages);
          buildTree(pages);
      });
      $scope.new = isNew;
      $scope.types = types;
      $scope.languages = Language.get();

      $scope.translations = Page.getTranslations({id:element.id});
  }

  init();

});
