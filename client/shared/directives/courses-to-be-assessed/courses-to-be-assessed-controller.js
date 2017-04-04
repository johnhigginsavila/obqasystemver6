(function(window, angular, undefined){
    angular.module('app')
        .controller('coursesToBeAssessedCtrl',['$scope','$log','$http','userSvc',function($scope,$log,$http,userSvc){
            $log.debug("course-to-be-assessed-directive is Ready");
            
            var config = {
                headers:{
                    'auth-token':userSvc.token
                }
            }
            
            $http.get('/secure-api/curriculumMap/get_allCourses',config).then(function(result){
                $scope.courses = result.data.data;
                
                
            })
            
        
        }])
        
})(window, window.angular)