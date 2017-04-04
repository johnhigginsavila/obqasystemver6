(function(window, angular, undefined){
    angular.module('app')
        .directive('coursesToBeAssessed',[function(){
            return{
                 restrict: 'E',
                 scope:{
                    
                 },
                 templateUrl: '/client/shared/directives/courses-to-be-assessed/courses-to-be-assessed.html',
                 controller: 'coursesToBeAssessedCtrl',
                 link:function(scope, elem, attrs){

                 }
            }
        }])
 })(window, window.angular)