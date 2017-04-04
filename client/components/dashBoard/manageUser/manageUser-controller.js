(function(window, angular, undefined){
    angular.module('app')
        .controller('manageUserCtrl', ['$scope', '$http','$state','userSvc',function($scope, $http, $state, userSvc){
            
            var config = {
                headers:{
                    'auth-token': userSvc.token
                }
            }
            
            $http.get('/secure-api/user/get_allInstructors', config)
                .then(function(response){
                    console.log(response.data.data);
                    $scope.users = response.data.data;
                })

            $scope.createUser = function(createUserForm, user){
                if(createUserForm.$valid){
                    $http.post('/secure-api/user/create_newUser', user, config).then(function(response){
                        console.log(response);
                    },function(err){
                        console.err(err);
                    })
                }else{
                    alert("Cannot add user");
                }
                
            }
        }])
})(window, window.angular)