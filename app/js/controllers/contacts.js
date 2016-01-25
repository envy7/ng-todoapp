todoApp.controller('ContactsController',
	['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL' ,
	function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){

		var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

      	auth.$onAuth(function(authUser){
        if(authUser){
          //for searching contacts
          var usersref = new Firebase(FIREBASE_URL + 'users/');
          var usersInfo = $firebaseArray(usersref);
          $scope.users = usersInfo;

          //for adding contacts
          var contactsref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/contacts');
          var contactsInfo = $firebaseArray(contactsref);
          $scope.contacts = contactsInfo;

          $scope.addcontacts = function(user){
            contactsInfo.$add({
              contactId: user.regUser,
              firstname: user.firstname,
              lastname: user.lastname,
              fullname: user.firstname + ' ' + user.lastname,
              email:  user.email,
              profileimgurl: user.profileimgurl,
              date: Firebase.ServerValue.TIMESTAMP
            });/*.then(function(){
              $scope.myForm.$setPristine();
              $scope.myForm.$setUntouched();
              $scope.entryheading= '';
              $scope.entrydetails= '';
            });promise*/
          };//addentry
          
        }//userAuthenticated
      });//on auth    

	}])//controller