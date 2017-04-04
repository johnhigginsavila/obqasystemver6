(function(window, angular, undefined){
    angular.module('app')
        .directive('assessmentLevel',[function(){
            return{
            restrict: 'E',
            scope:{
                
                assessmentLevel: '@assessmentLevel'
            },
            template: '<p>{{assessmentLevel}}</p>',
            link:function(scope, elem, attrs){

            }
          }
        }])
})(window, window.angular)