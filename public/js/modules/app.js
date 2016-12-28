
'use strict'

var app = angular.module('acsApp', ['ngRoute']);

//
//app.run(function ($rootScope, $log, $location) {
//    $location.path('/');//Add this
//    // continue code here
//});
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

