angular.module('angularApp').directive('widget', ['$compile', '$http','$templateCache', function($compile,$http,$templateCache){
return {
    restrict: 'E',
    replace: false,
    transclude: true,
    scope: { widgetid:"@",typeid:"@"},
    controller: 'WidgetCtrl',
    template: '<span ng-dblclick="openOptions()"><span ng-include src="templateUrl()"></span></span>',
    // template: '<h1>{{widgetid}}</h1>',
    link: function(scope,element,attrs){
      scope.typeid = attrs.typeid;
      scope.widgetid = attrs.widgetid;
    }
};}]);
