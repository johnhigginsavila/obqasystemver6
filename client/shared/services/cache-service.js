(function(window, angular, undefined){
    angular.module('app')
        .service('cacheSvc', [function(){
          var vm = this
        //caching classId
          vm.classInfo = undefined;
          var cachedClassInfo = localStorage.getItem('classInfo');
          if(cachedClassInfo){
            vm.classInfo = JSON.parse(cachedClassInfo);
          }
              
          vm.academicYear = '2015-2016';
          var cachedAcademicYear = localStorage.getItem('academicYear');
          if(cachedAcademicYear){
              vm.academicYear = JSON.parse(cachedAcademicYear);
          }    
            
        }]);
})(window, window.angular)