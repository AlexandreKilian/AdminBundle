'use strict';

/**
* @ngdoc function
* @name angularApp.controller:BlockCtrl
* @description
* # BlockCtrl
* Controller of the angularApp
*/
angular.module('angularApp')
.controller('BlockCtrl', [ '$scope', '$rootScope','$modal', 'Block', function ($scope,$rootScope, $modal, Block) {
    $scope.block = {};
    $scope.children = {};

    $scope.widgetTypes = [];

    var rClickEvent;

    $scope.showAdd = false;
    $scope.editMode = false;
    $scope.previewMode = true;



    $scope.templateUrl = function(){
        return window.brix.routing.block_template + "/" + $scope.block.type;
    }



    $scope.openElementOptions = function(id){
        $scope.showOptions = true;
        $scope.optionsId = id;
        $scope.optionsX = rClickEvent.pageX;
        $scope.optionsY = rClickEvent.pageY;
    };


    $scope.moveUp = function(index){
        if(index > 0){
            var thisChild = $scope.block.children[index];
            var prevChild = $scope.block.children[index-1];

            thisChild.order--;
            prevChild.order++;

            $scope.block.children[index] = prevChild;
            $scope.block.children[index-1] = thisChild;
        }

        saveBlock();

    }

    $scope.delete = function(index){
        Block.deleteChild({id:$scope.block.id},$scope.block.children[index]);
        $scope.block.children.splice(index,1);
    }

    $scope.moveDown = function(index){
        if(index < $scope.children.length){
            var thisChild = $scope.block.children[index];
            var nextChild = $scope.block.children[index+1];

            thisChild.order++;
            nextChild.order--;

            $scope.block.children[index] = nextChild;
            $scope.block.children[index+1] = thisChild;
        }
        saveBlock();
    }


    $scope.addElement = function(){
        var modalInstance = $modal.open({
            templateUrl: 'blockModal.html',
            controller: 'blockElementCtrl',
            resolve: {
                element: function(){
                    return null;
                },
                isNew: function(){
                    return true;
                },
                block: function(){
                    return $scope.block;
                }
            }

        });
        modalInstance.result.then(function (child) {
            $scope.block.children.push(child);
        }, function () {
        });
    }


    function saveBlock(){
        Block.set({id:$scope.block.id},$scope.block.children);
    }

    $scope.sortableOptions = {
        start: function(e,ui){
            // ui.item.find('.bxwidget').css("width",ui.item.find('.bxwidget').width());
        },
        update: function(e, ui) {
            console.log($scope.block.children);
        },
        beforeStop: function(e, ui) {
            console.log(ui);
        },
        drop: function(e,ui){
        },
        tolerance: 'pointer',
        forceHelperSizeType: true,
        helper: 'clone',
        revert: false
    };


    var load = function(){
        Block.get({id:$scope.id}).$promise.then(function(block){
            $scope.block = block;
            $scope.children = block.children;
        });
        Block.getTypes({id:$scope.id}).$promise.then(function(types){
            $scope.widgetTypes = types;
        });
    };

    var init = function(){

        $scope.$watch("id",load);

    };

    $scope.toggleAddWidget = function(){
        $scope.showAdd = !$scope.showAdd;
    };

    $scope.addWidget = function(type){
        Block.addWidget({id:$scope.id,type:type}).$promise.then(function(widget){
            $scope.block.children.push(widget);
        });
    }
    $scope.options = {
        activeClass: 'dropZone',
        accept: function(dragEl){
            console.log(dragEl);
            return true;
        }
    };

    $rootScope.$on('saveBlockElement',function(evt,data){
        if(data.id == $scope.id){
            $scope.block.children[data.index] = data.element;
        }
    });
    $rootScope.$on('toggleMode',function(evt,args){
        $scope.editMode = args.editMode;
        $scope.previewMode = args.previewMode;
    });

    $rootScope.$on('ngRightClick', function(evt,args){
        rClickEvent = args.event;
    });

    init();

}]);
