(function(window,angular,undefined){
    angular.module('app')
        .directive('leftNavClossing',[function(){
            return{
                restrict: 'E',
                template:'<md-content flex layout-padding><div layout="column" layout-align="top center"><p>Developers can also disable the backdrop of the sidenav.<br/>This will disable the functionality to click outside to close the sidenav.</p><div><md-button ng-click="toggleLeft()" class="md-raised">Toggle Sidenav</md-button></div></div></md-content></section></div>',
                controller:'left-navCtrl'
            }
        }])
})(window, window.angular)