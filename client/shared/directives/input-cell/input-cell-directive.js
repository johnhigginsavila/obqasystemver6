(function(window, angular, undefined){
    angular.module('app')
        .directive('inputCell', [function(){
            return{
            restrict: 'E',
            scope:{
                programCourseId: '@programCourseId',
                programSopiId: '@programSopiId',
                term: '@term',
                academicYear: '@academicYear',
                assessmentLevel: '@assessmentLevel'
            },
            templateUrl: '/client/shared/directives/input-cell/input-cell.html',
            controller: 'inputCellCtrl',
            link:function(scope, elem, attrs){

            }
          }
        }])
})(window, window.angular)