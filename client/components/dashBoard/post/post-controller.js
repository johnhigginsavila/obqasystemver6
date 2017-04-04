(function(window, angular, undefined){
    angular.module('app')
        .controller('postCtrl', ['$scope','$log','$mdDialog','Upload','userSvc',function($scope, $log, $mdDialog, Upload, userSvc){
            $log.info('postCtrl is online');
            
            $scope.exit = function(){
                $mdDialog.hide();
            }
            
            var config = {
                headers:{
                    'auth-token': userSvc.token
                }
            }
            
            
            $scope.uploadPic = function (file) {

                file.upload = Upload.upload({
                    url: '/secure-api/upload/upload_pic',
                    method: 'POST',
                    headers : {
                        'auth-token': userSvc.token
                    },
                    fields: {
                        username: 'adfadf'
                    },
                    file: file,
                    fileFormDataName: 'photo'
                });

                file.upload.then(function (response) {
                    console.log("Postcontroller: upload then ");
                    $timeout(function () {
                        file.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                });

                file.upload.progress(function (evt) {
                    // Math.min is to fix IE which reports 200% sometimes
                    file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    console.log("PostController: upload progress " + file.progress);
                });

                file.upload.success(function (data, status, headers, config) {
                    // file is uploaded successfully
                    console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
                });
            }
            
        }])
})(window, window.angular)