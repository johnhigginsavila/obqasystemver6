(function(window, angular, undefined){
  angular.module('app')
  .controller('curriculumMapCtrl',['$scope', '$http','$state','userSvc','$mdSidenav','$log','cacheSvc', function($scope, $http, $state, userSvc,$mdSidenav, $log,cacheSvc){
    
    var config = {
        headers:{
            'auth-token':userSvc.token
        }
    } 
    
    $http.get('/secure-api/curriculumMap/get_toBeAssessedCourses', config).then(function(result){
        console.log(result);
        $scope.courses = result.data.data;
        
    },function(err){
        console.err(err);
    })
    
    $scope.selectedYear = cacheSvc.academicYear; 
    $scope.academicYear = $scope.selectedYear;
    
    
    $http.get('/secure-api/curriculumMap/get_programSopi', config).then(function(result){
        console.log(result);
        $scope.sopis = result.data.data;
        
        
    })
    
   
    
    $scope.academicYearChange = function(selected){
        console.log("The year was changed to "+selected);
        cacheSvc.academicYear = selected;
        localStorage.setItem('academicYear', JSON.stringify(cacheSvc.academicYear));
        $state.reload();
        
    }
    
    
    
    
    
    
    
    /*
    *For side mdSidenav
    *
    */
    
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
 
    
    $scope.close = function(){
        $mdSidenav('right').close()
            .then(function(){
            $log.debug('close RIGHT is done');
        })
    }
   
    
    
      
  }])
})(window, window.angular);