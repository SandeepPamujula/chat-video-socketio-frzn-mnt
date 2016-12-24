
'use strict'

var app = angular.module('acsApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/login',
            {
                controller: 'loginController',
                templateUrl: '/login.html'
            })
        .when('/chat',
            {
                controller: 'chatController',
                templateUrl: '/chat.html'
            })
        
        .otherwise({ redirectTo: '/login' });
});

