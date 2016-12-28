
'use strict';

app.controller('loginController', ['$scope','$location','dataService', 'chatService', 
     function($scope, $location, dataService, chatService ) {

         console.log('loginController called ');
         $scope.userName = dataService.getUserName();

            $scope.login = function() {
                console.log('--> '+ $scope.userName);
                dataService.setUserName($scope.userName);
                chatService.addUser($scope.userName);
                $location.path('/chat');
                console.log(dataService.getUserName());
            };
            
     }]);