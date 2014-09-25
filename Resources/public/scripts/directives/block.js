angular.module('angularApp').directive('block', function(){

  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    controller: 'BlockCtrl',
    scope: { name:"=",page:"&",blockid:"&"},
    // template: '<ng data-drop="false" ng-model="block" data-jqyoui-options="options" jqyoui-droppable="{multiple:true}"><blockelement ng-repeat="child in block.children" element="child" data-drag="{{!editMode}}" data-jqyoui-options="{revert: \'invalid\'}" jqyoui-draggable="{animate:true}" ng-model="block"></blockelement><input type="submit" class="bx_controll" value="+" ng-click="toggleAddWidget()"><ul ng-show="showAdd"><li ng-repeat="type in widgetTypes" ng-click="addWidget(type.id)">{{type.name}}</li></ul></ng>',
    templateUrl: 'block.html',
    // template: '<span ng-class="{blockcontainer:!editMode,preview:previewMode}" ng:model="block.children"><span ng-repeat="child in block.children track by child.id" ><span><blockelement element="child"></blockelement></span></span></span>',
    link: function(scope, element, attrs, blockCtrl) {
      scope.id = attrs.blockid;
    }
  };});

  angular.module('angularApp').directive('childblock', function(){

    return {
      restrict: 'E',
      replace: true,
      controller: 'BlockCtrl',
      scope: { blockid:"@"},
      templateUrl: 'childblock.html',
      link: function(scope, element, attrs, blockCtrl) {
        scope.id = attrs.blockid;
      }
    };});
