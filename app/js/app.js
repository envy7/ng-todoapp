'use strict';

var todoApp = angular.module('todoApp', ['ngResource'])
	.config(function ($routeProvider, $locationProvider){
		$routeProvider.when('/login',
            {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            });
		$routeProvider.when('/signup',
            {
                templateUrl: 'templates/signup.html',
                controller: 'SignupController'
            });
		$routeProvider.otherwise({redirectTo: '/login'});
		$locationProvider.html5Mode(true);
	});
   
