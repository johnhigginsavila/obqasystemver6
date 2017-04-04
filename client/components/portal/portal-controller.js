(function(window, angular, undefined){
  angular.module('app')
  .controller('portalCtrl',['$scope', '$http','$state','userSvc','$mdBottomSheet','$timeout', '$mdToast', function($scope, $http, $state, userSvc,$mdBottomSheet,$timeout,$mdToast){
    
    $scope.pageResource = {
        title:'Outcomes-based Quality Assurance',
        name: 'Portal'
    }  
    
    $scope.logInBottomSheet = function() {
    $scope.alert = '';
    $mdBottomSheet.show({
      templateUrl: '/client/components/portal/logIn-bottom-sheet/logIn-bottom-sheet.html',
      controller: 'logInBottomSheetCtrl'
    })
  };

     
      
    
  }])
})(window, window.angular);