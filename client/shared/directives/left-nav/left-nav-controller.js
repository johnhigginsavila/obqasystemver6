(function(window, angular, undefined){
    angular.module('app').controller('left-navCtrl',['$scope', '$http','$state','userSvc','$mdSidenav', function($scope, $http, $state, userSvc,$mdSidenav){
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
            alert("You must login to view this content");
            $state.go('portal');
        });
        
        $scope.goToPage = function(page){
            $state.go(page);
        }
        
        $scope.logOut = function(){
            userSvc.token = "intruder";
            userSvc.user = "intruder";
            localStorage.setItem('token', JSON.stringify(userSvc.token));
            localStorage.setItem('user', JSON.stringify(userSvc.token));
            $state.go('portal');
        }
        
        $scope.toggleLeft = buildToggler('left');
        $scope.toggleRight = buildToggler('right');

        function buildToggler(componentId) {
            return function() {
                $mdSidenav(componentId).toggle();
            };
        }

    
  }])
})(window, window.angular)