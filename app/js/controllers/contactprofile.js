todoApp.controller('ContactProfileController',
	['$scope', '$rootScope', '$firebaseObject', '$firebaseAuth', '$routeParams', '$firebaseArray', 'FIREBASE_URL' ,
	function($scope, $rootScope, $firebaseObject, $firebaseAuth, $routeParams, $firebaseArray, FIREBASE_URL){

	var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser){
    if(authUser){

			$scope.whichuser = $routeParams.cId;

			var profileref = new Firebase(FIREBASE_URL + 'users/' + $scope.whichuser);
			var obj = $firebaseObject(profileref);

			$scope.profile = obj;

			
			



		}//userAuthenticated
    });//on auth
}])//controller