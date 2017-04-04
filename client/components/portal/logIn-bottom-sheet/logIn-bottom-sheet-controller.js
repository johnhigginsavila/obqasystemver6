(function(window, angular, undefined){
    angular.module('app')
        .controller('logInBottomSheetCtrl',['$mdBottomSheet','$scope','$log','$http','$state','userSvc','$mdDialog',function($mdBottomSheet, $scope, $log,$http,$state,userSvc, $mdDialog){
            $log.debug('logInBottomSheetCtrl is online');
            
            $scope.logUserIn = function(userLogIn, loginName, password){
                var user = {
                    loginName : loginName,
                    password : password
                }
                if (userLogIn.$valid){
                    $http.post('/api/user/login', user).then(function(response){
                    userSvc.token = response.data.token;
                    userSvc.user = response.data.userData;
                    localStorage.setItem('token', JSON.stringify(userSvc.token));
                    localStorage.setItem('user', JSON.stringify(userSvc.user));
                    $state.go('home');
                  },function(err){
                    $log.debug(err);
                     $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('This is an alert title')
                        .textContent(err.data)
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                    );  
                  })
                }else{
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('This is an alert title')
                        .textContent('You must fill the required fields')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Got it!')
                    );
                }

            }  
            
            $scope.bottomSheetHide = function(){
                $mdBottomSheet.hide($log.debug('bottomSheet hid'));
            }
        }])
})(window, window.angular)