todoApp.controller('EntriesController', 
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL' ,
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL ) {
      
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
          var entriesref = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/entries');
          var entriesInfo = $firebaseArray(entriesref);
          $scope.entries = entriesInfo;

          //for including the number of entries
          entriesInfo.$loaded().then(function(data){
            $rootScope.numentries = entriesInfo.length;
          });

          //so that count changes as soon as the number of entries changes
          entriesInfo.$watch(function(data){
            $rootScope.numentries = entriesInfo.length;
          });

          $scope.addEntry = function(){
            entriesInfo.$add({
              heading: $scope.entryheading,
              details: $scope.entrydetails,
              date: Firebase.ServerValue.TIMESTAMP
            }).then(function(){
              $scope.myForm.$setPristine();
              $scope.myForm.$setUntouched();
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