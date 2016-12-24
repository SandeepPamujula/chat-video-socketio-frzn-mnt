

app.service("chatService",["$http","$rootScope", "sharedService",
                           function($http, $rootScope, sharedService) {
	'use strict';
    var socket = io();
    var connected = false;
    var userName = '';
    
//    var myInjector = angular.injector(["ng"]);
//    var $rootscope = myInjector.get("$rootscope");
    
    console.log('chatService started..');
	
    var chatServices = {};
    
    chatServices.addUser = function (userName) {
      
        if (!connected){
            console.log('add-user '+userName);
            socket.emit('add-user', userName);    
        }
        
        
    };
    
    chatServices.sendMessage = function (clientName, message) {
         if ( socket && connected ){

             var data = {
                        sendername : userName,
                        username: clientName,
                        message: message
                     };

            socket.emit('private-message',data);   
         }
    };
    chatServices.logout = function () {
   
        connected = false;
        socket.emit('logout', userName); 
        userName = '';
 
   };
    
    socket.on('login', function (data) {
        connected = true;
        userName = data.username;
        var onlineUsers = data.clients;
        var keys = Object.keys(onlineUsers);
        sharedService.broadcastOnlineUsers(keys);
        console.log('login chat service: ');

        console.log(keys);
        
       
   });
   
   
    socket.on('online-users', function (data) {
        console.log('online-users chat service: ');
        var onlineUsers = data.clients;
        var keys = Object.keys(onlineUsers);
        console.log(keys);
        sharedService.broadcastOnlineUsers(keys);
        
    });
   socket.on('private-message', function (data) {
       console.log('private message : '+JSON.stringify(data));
       sharedService.prepForBroadcast(data);
    
   });

   return chatServices;
}]);