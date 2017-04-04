(function(window, angular, undefined){
    angular.module('app')
        .controller('topNavCtrl', ['$scope', '$http','$state','userSvc', function($scope, $http,$state, userSvc){
            
            $scope.userData = userSvc.user;
            $scope.pages = [];

            var config = {
                headers:{
                    'auth-token': userSvc.token
                }
            }

          //GET pages
            $http.get('/secure-api/page/get_restrictions',config).then(function(response){
                $scope.pages = response.data.data;
                console.log($scope.pages);
            }, function(err){
                $state.go('portal');
            });
                      
            $scope.logout = function(){
                
                userSvc.token = undefined;
                userSvc.user = undefined;
                localStorage.setItem('token', JSON.stringify(userSvc.token));
                localStorage.setItem('user', JSON.stringify(userSvc.token));
                $state.go('portal');
            }
        }])
})(window, window.angular)