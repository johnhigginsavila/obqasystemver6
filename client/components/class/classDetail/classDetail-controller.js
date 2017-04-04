(function(window, angular, undefined){
    angular.module('app')
        .controller('classDetailCtrl',['$http','$scope','userSvc','cacheSvc', function($http, $scope, userSvc, cacheSvc){
            
            var config = {
                headers: {
                    'auth-token':userSvc.token
                }
            }
            
            console.log(cacheSvc.classInfo);
            $scope.classInfo = cacheSvc.classInfo;
            
            $http.post('/secure-api/class/get_classStudents', cacheSvc.classInfo,  config).then(function(response){
                console.log(response.data.data);
                $scope.students = response.data.data;
                return response;
            }).then(function(response){
                console.log(response.data.data);
                console.log("data has been preserved");
                console.log(cacheSvc.classInfo);
                
                //get assessments
                
            })
            
        }])
})(window, window.angular)