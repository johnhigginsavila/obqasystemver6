(function(window, angular, undefined){
    angular.module('app')
        .controller('inputCellCtrl',['$scope','$http','$state','userSvc', function($scope,$http,$state,userSvc){
            
          var config = {
                headers:{
                    'auth-token': userSvc.token
                }
            }
            
            
            data = {programSopiId:$scope.programSopiId,programCourseId:$scope.programCourseId,academicYear:$scope.academicYear}
            
            $http.post('/secure-api/assessment/get_assessmentByProgramCourseIdProgramSopiIdAndAcademicYear',data,config).then(function(result){
                //console.log($scope.programSopiId);
                $scope.assessments = result.data.data;
                console.log($scope.assessments);
            })
            
            
          
            
            $scope.configureMap = function(w,x,y,z){
                console.log(x+". "+y+". "+z+". "+w);
            
            }
          
            
        }])
})(window, window.angular)