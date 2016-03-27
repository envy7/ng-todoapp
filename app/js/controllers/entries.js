todoApp.controller('EntriesController', 
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL' ,
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL ) {
      
      var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseAuth(ref);

      //code for controlling the edit entry functionality
      $scope.edit = false;

      //code for controlling the add image functionality
      $scope.imageurl = false;
      $scope.video = false;
      $scope.entryimage = null;
      $scope.videoid = null;
      
      $scope.hideimage = function(){
        if($scope.imageurl = true){
          $scope.imageurl = false;
        }

        if($scope.video = true){
          $scope.video = false;
        }
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
              image: $scope.entryimage,
              videourl: 'https://www.youtube.com/embed/' + $scope.videoid,
              date: Firebase.ServerValue.TIMESTAMP
            }).then(function(){
              $scope.myForm.$setPristine();
              $scope.myForm.$setUntouched();
              $scope.entryheading= '';
              $scope.entrydetails= '';
              $scope.entryimage= '';
              $scope.videoid = '';
            });//promise
          };//addentry

          $scope.deleteEntry = function(key){
            entriesInfo.$remove(entriesInfo.length - key -1);
          };//deleteEntry
        }//userAuthenticated
      });//on auth    
}]);//controller