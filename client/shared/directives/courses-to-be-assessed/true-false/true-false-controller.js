(function(window, angular, undefined){
    angular.module('app')
        .controller('trueFalseCtrl',['$scope','$log','$http','userSvc',function($scope,$log,$http,userSvc){
            $log.debug("true-false-directive is Ready");
            
            var config = {
                headers:{
                    'auth-token':userSvc.token
                }
            }
            
            var data = {
                programCourseId : $scope.programCourseId
            }
            
            $http.post('/secure-api/curriculumMap/get_course',data,config).then(function(result){
               $scope.course = result.data.data[0];
                console.log($scope.course);
               
            })
            
            $scope.changeState = function(id){
                console.log("It changes" + id);
                var id = {
                    id : id
                }
                var config = {
                    headers: {
                        'auth-token' : userSvc.token
                    }
                }
                $http.post('/secure-api/curriculumMap/updateProgramCourseToBeAssessed', id, config).then(function(result){
                    console.log(result);
                })
            }
            
            
            
            
        }])
        
})(window, window.angular)