'use strict';

todoApp.controller('SignupController',
	function SignupController($scope){
		$scope.user = {
			firstname: 'John',
			image: '/img/profile.jpg'
		};

		$scope.cancel = function(){
			window.location = '/signup';
		};

		$scope.saveuser = function(user, signupForm){
			if(signupForm.$valid){
				window.alert('user ' + user.firstname + ' saved!');
			}
		};
	}
)