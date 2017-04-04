(function(window, angular, undefined){
  angular.module('app')
  .controller('dashBoardCtrl',['$scope', '$http','$state','userSvc','$log','$mdDialog', function($scope, $http, $state, userSvc, $log, $mdDialog){
    
    $scope.userData = userSvc.user;
      
    $scope.goToManageUser = function(){
        $state.go('manageUser');
    }
    
    
    $scope.goToManageCurriculum = function(){
        $state.go('manageCurriculum');
        
    }
    
    $scope.post = function() {
       $mdDialog.show({
          controller: 'postCtrl',
          templateUrl: '/client/components/dashBoard/post/post.html',
          parent: angular.element(document.body),
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
     }
    
    
    }])
  
    
})(window, window.angular);