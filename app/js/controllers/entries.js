todoApp.controller('EntriesController', 
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL' ,
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL ) {
      
      var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseAuth(ref);

      $scope.edit = false;

       $scope.editstart = function(){
        $scope.edit = true;
      }

      $scope.editstop = function(){
        $scope.edit = false;
      }

      auth.$onAuth(function(authUser){
        if(authUser){
          var entriesref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/entries');
          var entriesInfo = $firebaseArray(entriesref);
          $scope.entries = entriesInfo;

          $scope.addEntry = function(){
            entriesInfo.$add({
              heading: $scope.entryheading,
              details: $scope.entrydetails,
              date: Firebase.ServerValue.TIMESTAMP
            }).then(function(){
              $scope.entryheading= '';
              $scope.entrydetails= '';
            });//promise
          };//addentry

          $scope.deleteEntry = function(key){
            entriesInfo.$remove(key);
          };//deleteEntry
        }//userAuthenticated
      });//on auth    
}]);//controller