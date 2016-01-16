todoApp.controller('ContactsController',
	['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL' ,
	function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){

		var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

      //code for controlling the edit entry functionality
	    $scope.edit = false;

	    $scope.editstart = function(){
	        $scope.edit = true;
	    }

	    $scope.editstop = function(){
	    	$scope.edit = false;
	    }


      	auth.$onAuth(function(authUser){
        if(authUser){
          var hobbiesref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/hobbies');
          var hobbiesInfo = $firebaseArray(hobbiesref);
          $scope.hobbies = hobbiesInfo;

          $scope.addHobby = function(){
            hobbiesInfo.$add({
              name: $scope.hobby
            }).then(function(){
              $scope.myForm.$setPristine();
              $scope.myForm.$setUntouched();
              $scope.hobby = '';
            });//promise
          };//addHobby

          $scope.deleteHobby = function(key){
            hobbiesInfo.$remove(key);
          };//deleteHobby
        }//userAuthenticated
      });//on auth    

	}])//controller