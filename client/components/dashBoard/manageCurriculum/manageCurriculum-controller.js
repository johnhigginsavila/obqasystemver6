(function(window, angular, undefined){
    angular.module('app')
        .controller('manageCurriculumCtrl',['$scope','$state',function($scope,$state){
            $scope.manageCurriculumData = {
                title : 'Manage Curriculum'
            }
            
            $scope.setUpNewCurriculum = function(){
                $state.go('setUpNewCurriculum');
                
            }
            
            
            
        }])
})(window, window.angular)