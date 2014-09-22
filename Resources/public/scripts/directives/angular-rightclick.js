// 'use strict';
//
// angular.module('angularApp').directive('ngRightClick', function($rootScope, $parse) {
//     return function(scope, element, attrs) {
//         var fn = $parse(attrs.ngRightClick);
//         element.bind('contextmenu', function(event) {
//             scope.$apply(function() {
//                 event.preventDefault();
//                 $rootScope.$broadcast("ngRightClick",{event:event});
//                 fn(scope, {$event:event});
//             });
//         });
//     };
// });
