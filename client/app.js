(function(window, angular,undefined){
  angular.module('app',['ngMaterial','mdDataTable','ui.router','ngFileUpload'])
    
    .config(['$urlRouterProvider', '$stateProvider','$mdThemingProvider', function($urlRouterProvider, $stateProvider,$mdThemingProvider){
        
      $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();    
      $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
      $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
      $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
      $mdThemingProvider.theme('customTheme')   
                  .primaryPalette('teal')
                  .accentPalette('orange')
                  .warnPalette('red')    
      $mdThemingProvider.setDefaultTheme('customTheme');             
        
      $stateProvider
        .state('portal',{
          url: '/',
          templateUrl: '/client/components/portal/portal.html',
          controller: 'portalCtrl'
        })
      //HOME
        .state('home',{
          url:'/home',
          templateUrl:'/client/components/home/home.html',
          controller:'homeCtrl'
        })
      //CLASS
        .state('class',{
          url:'/class',
          templateUrl:'/client/components/class/class.html',
          controller:'classCtrl'
        })
        .state('classDetail',{
          url:'/class/classDetail',
          templateUrl:'/client/components/class/classDetail/classDetail.html',
          controller:'classDetailCtrl'
        })
      //ABOUT
        .state('about',{
          url:'/about',
          templateUrl:'/client/components/about/about.html',
          controller:'aboutCtrl'
        })
      //CURRICULUM MAP
        .state('curriculumMap',{
          url:'/curriculumMap',
          templateUrl:'/client/components/curriculumMap/curriculumMap.html',
          controller:'curriculumMapCtrl'
        })
      //DASHBOARD
        .state('dashBoard',{
          url:'/dashBoard',
          templateUrl:'/client/components/dashBoard/dashBoard.html',
          controller:'dashBoardCtrl'
        })
        .state('manageUser', {
          url:'/dashBoard/manageUser',
          templateUrl:'/client/components/dashBoard/manageUser/manageUser.html',
          controller: 'manageUserCtrl'
        })
        .state('manageCurriculum', {
          url:'/dashBoard/manageCurriculum',
          templateUrl: '/client/components/dashBoard/manageCurriculum/manageCurriculum.html',
          controller: 'manageCurriculumCtrl'
        })
        .state('setUpNewCurriculum',{
          url:'/dashBoard/manageCurriculum/setUpNewCurriculum',
          templateUrl: '/client/components/dashBoard/manageCurriculum/setUpNewCurriculum/setUpNewCurriculum.html',
          controller: 'setUpNewCurriculumCtrl'
        })
       
      
     
      $urlRouterProvider.otherwise('/');
    }])
})(window, window.angular)
