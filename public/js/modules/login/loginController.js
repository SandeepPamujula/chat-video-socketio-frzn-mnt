
'use strict';

app.controller('loginController', ['$scope','$location','dataService', 'chatService', 
     function($scope, $location, dataService, chatService ) {

         console.log('loginController called ');
         $scope.user = {};
         $scope.user.userName = dataService.getUserName();

            $scope.login = function() {
                console.log('--> '+ $scope.user.userName);
                dataService.setUserName($scope.user.userName);
                chatService.addUser($scope.user.userName);
                $location.path('/chat');
                console.log(dataService.getUserName());
            };
            
     }]);