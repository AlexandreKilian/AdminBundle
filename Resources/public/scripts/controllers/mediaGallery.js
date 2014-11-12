
'use strict';

/**
* @ngdoc function
* @name angularApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('mediaGallery', function($scope,$modalInstance,$upload, Media) {

    $scope.page = 1;
    $scope.end = false;

    $scope.media = [];

    var init = function(){
        loadMediaPage();
    }


    var loadMediaPage = function(){
        Media.get({page:$scope.page}).$promise.then(function(data){
            if(data.length == 0){
                if($scope.page > 1){
                    $scope.page--;
                } else{
                    $scope.page = 1;
                }
                $scope.end = true;
            } else{
                $scope.media = data;
                $scope.end = false;
            }
        });
    }


    $scope.selectMedia = function(media){
        $modalInstance.close(media);
    }

    $scope.nextPage = function(){
        if($scope.end)return;
        $scope.page++;
        loadMediaPage();
    }

    $scope.previousPage = function(){
        if($scope.page == 1)return;
        $scope.page--;
        loadMediaPage();
    }


    $scope.ok = function () {

        $modalInstance.close(null);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };


    $scope.onFileSelect = function($files,field) {
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];
            $scope.upload = $upload.upload({
                url: window.brix.routing.media_upload,
                file: file
            }).progress(function(evt){
            }).success(function(data, status, headers, config) {

                $scope.media.unshift(data);

            });
        }
    };

    init();

});
