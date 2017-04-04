(function(window, angular, undefined){
  angular.module('app')
    .directive('topNav', [function(){
      return{
        restrict: 'E',
        scope:{
            userData: '=userData'
        },
        templateUrl: '/client/shared/directives/top-nav/top-nav.html',
        controller: 'topNavCtrl',
        link:function(scope, elem, attrs){

        }
      }
    }])
})(window, window.angular)
