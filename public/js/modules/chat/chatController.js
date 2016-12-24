
'use strict';

app.controller('chatController', ['$scope', '$rootScope', '$location','$window', 'dataService', 'sharedService', 'chatService', function($scope, $rootScope, $location, $window, dataService, sharedService, chatService ) {
         $scope.user = dataService.getUserName();
         $scope.showChat = false;
         $scope.chatText = '';
         $scope.whomToChat = undefined;
         $scope.allChatText = '';
         console.log('chatController called ');
         
        $window.onbeforeunload =  $scope.onExit;
                                  
                                  
        $scope.onExit = function () {
            chatService.logout();               
        };
        $scope.$on('handleBroadcast', function() {
            
            
            var msgObj = sharedService.message;
            var msg = msgObj.sendername+' : '+msgObj.message+'\n';
            $scope.startChat(msgObj.sendername);
            console.log('handleBroadcast: chatController '+ msg);
            $scope.$apply(function(){
                appendChatText(msg);    
            });
            

        });
    
        $scope.$on('online-users',function(){
           
            var onlineUsers = sharedService.onlineUsers;
            console.log('online users chat controller: '+ onlineUsers);
            
            $scope.$apply(function(){
                $scope.onlineUsers = onlineUsers.filter(item => item !== $scope.user);
            });
            
        });
         
         var appendChatText = function (newLine) {
             $scope.allChatText += newLine;
         };
         
         $scope.startChat = function (user) {
             
             if ($scope.whomToChat != user ){
                $scope.stopChat();
                 console.log($scope.user + ' chatting with '+ user);
                 $scope.showChat = true;
                 $scope.whomToChat = user;    
             }
             
         }; 
         
         $scope.stopChat = function () {
             
             $scope.allChatText = '';
             $scope.showChat = false;
             $scope.whomToChat = undefined;
             
         }
         
         $scope.startVideo = function (user) {
             console.log($scope.user + ' facetime with '+ user);
         };
         
         $scope.sendText = function (){
             console.log($scope.chatText);
             var msg = $scope.user+' : '+$scope.chatText+'\n';
             
             appendChatText(msg);
             chatService.sendMessage($scope.whomToChat,$scope.chatText);
             $scope.chatText = '';
         }
         

     }]);