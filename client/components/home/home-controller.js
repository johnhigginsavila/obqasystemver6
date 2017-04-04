(function(window, angular, undefined){
  angular.module('app')
    
    .controller('homeCtrl',['$scope', '$http','$state','userSvc','$mdSidenav','$log',function( $scope, $http, $state, userSvc, $mdSidenav, $log){
    
      
      
    
        $scope.pageData = {
          title : 'Outcomes-based Quality Assurance',
          pageTitle: 'Home'
        }    
        $scope.userData = userSvc.user;
        
        $log.debug($scope.userData);
    }])
})(window, window.angular);
