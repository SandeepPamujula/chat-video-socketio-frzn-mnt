'use strict';



const express = require('express');
let app = express();
//const server = require('http').createServer(app);
const fs = require('fs');
const https = require('https');





const port = 8080;
const _ = require('lodash');

 var options = {
      key: fs.readFileSync('./sslcert/key.pem', 'utf8'),
      cert: fs.readFileSync('./sslcert/server.crt', 'utf8')
   };
var httpsServer = https.createServer(options, app);
const io = require('socket.io')(httpsServer);
//const io = require('socket.io')(server);

let clients = {};

app.use(express.static(__dirname+'/public'));

console.log(__dirname+'/public');



io.on('connection',function(client){
    
    console.log('------------------------------------');
    console.log('connection ');
//    console.dir(client);
    
   client.on('add-user',function(username){
       
       console.log('add-user '+ username);
        clients[username] = {
          "socket": client.id
        };  
       client.emit('login', {
            username : username,
            clients : clients
        });
       console.log(JSON.stringify(clients));
        // echo globally (all clients) that a person has connected
        client.broadcast.emit('online-users', {
          clients : clients
        });
       
   });
    
   client.on('logout',function(username){
       console.log('logout '+ username);
       clients = _.omit(clients,[username]);
       console.log(JSON.stringify(clients));
        client.broadcast.emit('online-users', {
          clients : clients
        });
       
   });
    
   client.on('private-message', function (data) {
       if ( clients[data.username] ){
            var clientSock = clients[data.username].socket;
            if ( io.sockets.connected[clientSock] ){
                io.sockets.connected[clientSock].emit("private-message",  {
                                      sendername: data.sendername,
                                      message: data.message
                                });
            }

       }
            
   });
    
   client.on('video-chat', function (data) {
       if ( clients[data.client] ){
            var clientSock = clients[data.client].socket;
            if ( io.sockets.connected[clientSock] ){
                io.sockets.connected[clientSock].emit("video-chat",  {
                                      sendername: data.sendername,
                                      sessionID: data.sessionID
                                });
            }

       }
            
   });
    
});

//server.listen(port, function(){
//    console.log('server listening on '+ port);
//});
httpsServer.listen(port,function(){
    console.log('https server listening on '+ port);
});
