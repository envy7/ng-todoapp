todoApp.controller('ContactsController',
	['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL' ,
	function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){

		var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

      	auth.$onAuth(function(authUser){
        if(authUser){
          var usersref = new Firebase(FIREBASE_URL + 'users/');
          var usersInfo = $firebaseArray(usersref);
          $scope.users = usersInfo;

          
        }//userAuthenticated
      });//on auth    

	}])//controller