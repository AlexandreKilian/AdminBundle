angular.module('angularApp').directive('editor', function(){

  return {
    restrict: 'A',
    replace: true,
    transclude : true,
    scope : {

    },
    link : function( $scope, $element, $attrs ) {

      new Medium({
        element: $element.get(0),
        mode: Medium.richMode,
        pasteAsText: false
      })
    }
  };});
