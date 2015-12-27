'use strict';

todoApp.controller('SignupController',
	function SignupController($scope, userData){
		$scope.user = {
			firstname: 'John',
			image: '/img/profile.jpg'
		};

		$scope.cancel = function(){
			window.location = '/signup';
		};

		$scope.saveuser = function(user, signupForm){
			if(signupForm.$valid){
				userData.save(user);
				window.alert('user ' + user.firstname + ' saved!');
			}
		};
	}
)