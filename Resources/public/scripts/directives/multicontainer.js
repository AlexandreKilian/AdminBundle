angular.module('angularApp').directive('multicontainer', function(){

return {
    restrict: 'E',
    replace: true,
    scope: { widgets:"="},
    // transclude: true,
    templateUrl: '/views/multicontainer.html'
};});
