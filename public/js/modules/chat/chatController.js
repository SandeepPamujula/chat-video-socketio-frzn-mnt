
'use strict';

app.controller('chatController', ['$scope', '$rootScope', '$location','$window', 'dataService','sharedService', 'chatService', 'fmService','unloadService', function($scope, $rootScope, $location, $window, dataService, sharedService, chatService, fmService, unloadService ) {
         $scope.user = dataService.getUserName();
         $scope.showChat = false;
         $scope.chat = {};
         $scope.chat.chatText = '';
         $scope.whomToChat = undefined;
         $scope.allChatText = '';
         console.log(' *** chatController called 1');
    
    
         $scope.$on('onBeforeUnload', function (e, confirmation) {
             chatService.logout();
        });
                                  
        $scope.$on('chat-user', function() {
            
            var msgObj = sharedService.message;
            var msg = msgObj.sendername+' : '+msgObj.message+'\n';
            $scope.startChat(msgObj.sendername);
            console.log('chat-user: chatController '+ msg);
            $scope.$apply(function(){
                appendChatText(msg);    
            });
            

        });
    
        $scope.$on('login-users',function(){
           
            var onlineUsers = sharedService.loginUsers;
            console.log('login-users: chat controller: '+ onlineUsers);
            
            $scope.$apply(function(){
                $scope.onlineUsers = onlineUsers.filter(item => item !== $scope.user);
            });
            
        });
    
        $scope.$on('online-users',function(){
           
            var onlineUsers = sharedService.onlineUsers;
            console.log('online-users: chat controller: '+ onlineUsers);
            
            $scope.$apply(function(){
                $scope.onlineUsers = onlineUsers.filter(item => item !== $scope.user);
            });
            
        });
        console.log(' *** chatController called 2');
        $scope.videoOnline = false;
        $scope.$on('online-video',function(){
           console.log('online-video: chat controller: 1 '+$scope.videoOnline);
            // if ( $scope.videoOnline == false ){
                
                $scope.videoOnline = true;
                
                var videoData = sharedService.videoData;
                console.log('online-video: chat controller: 2 '+ JSON.stringify(videoData));

                $scope.$apply(function(){
                    $scope.startVideo(videoData.sendername,videoData.sessionID);
                });
            // }
            
            
        });
         
         var appendChatText = function (newLine) {
             $scope.allChatText += newLine;
         };
         console.log(' *** chatController called 3');
    
         $scope.startChat = function (user) {
             
//             $scope.videoSrc = '../../../video/moon.mp4';
             
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
         
         $scope.startVideo = function (cleint, session) {
             console.dir(fmService);
             var sessionID  = session;
             if (!session) {
              // Create a random 6 digit number for the new session ID.
                sessionID = Math.floor(Math.random() * 900000) + 100000;
                chatService.startVideoChat(cleint,sessionID);
                
             }
              
           
             fmService.startVideoChat(sessionID);
             console.log($scope.user + ' facetime with '+ cleint);
         };
         
         $scope.sendText = function (){
             console.log($scope.chat.chatText);
             var msg = $scope.user+' : '+$scope.chat.chatText+'\n';
             
             appendChatText(msg);
             chatService.sendMessage($scope.whomToChat,$scope.chat.chatText);
             $scope.chat.chatText = '';
         }
         

     }]);