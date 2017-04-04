(function(window,angular,undefined){
    angular.module('app')
        .directive('leftNav',[function(){
            return{
                restrict: 'E',
                scope:{
                    userData: '=userData'
                },
                templateUrl:'/client/shared/directives/left-nav/left-nav.html',
                controller:'left-navCtrl'
            }
        }])
})(window, window.angular)