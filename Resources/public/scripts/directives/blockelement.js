angular.module('angularApp').directive('blockelement', function(){

return {
    restrict: 'E',
    // replace: true,
    transclude: true,
    scope: { element:"="},
    // transclude: true,
    template: '<span ng-switch on="element.element_type">'+
                '<span ng-switch-when="block"><childblock blockid="{{element.id}}"></childblock></span>'+
                '<span ng-switch-when="widget"><widget widgetid="{{element.id}}" typeid="{{element.type.id}}" ></widget></span>'+
              '</span>'
};});
