(function(window, angular, undefined){
    angular.module('app')
        .directive('trueFalse',[function(){
            return{
                 restrict: 'E',
                 scope:{
                    programCourseId : '=programCourseId'
                     
                 },
                 templateUrl: '/client/shared/directives/courses-to-be-assessed/true-false/true-false.html',
                 controller: 'trueFalseCtrl',
                 link:function(scope, elem, attrs){

                 }
            }
        }])
 })(window, window.angular)