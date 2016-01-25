todoApp.controller('ContactsController',
	['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL' ,
	function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL){

		var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    $scope.search = false;

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

          //for including the number of contacts
          contactsInfo.$loaded().then(function(data){
            $rootScope.numcontacts = contactsInfo.length;
          });

          //so that count changes as soon as the number of contacts changes
          contactsInfo.$watch(function(data){
            $rootScope.numcontacts = contactsInfo.length;
          });

          $scope.addcontacts = function(user){
            contactsInfo.$add({
              contactId: user.regUser,
              firstname: user.firstname,
              lastname: user.lastname,
              fullname: user.firstname + ' ' + user.lastname,
              email:  user.email,
              profileimgurl: user.profileimgurl,
              date: Firebase.ServerValue.TIMESTAMP
            }).then(function(){
              $scope.myForm.$setPristine();
              $scope.myForm.$setUntouched();
              $scope.query = '';
            });//promise
          };//addentry
          
        $scope.delcontacts = function(key){
            contactsInfo.$remove(key);
          };//deleteEntry  


        }//userAuthenticated
      });//on auth    

	}])//controller