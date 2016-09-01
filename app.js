
var app = angular.module('app', ['ngMessages']);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
  
  // Update label for more/less button
  var moreTxt = "More >>";
  var lessTxt = "<< Less";
  
  $scope.orderProp = ""; 
  $scope.expanded = false; 
  $scope.expandTitle = moreTxt; 
  
  // Simple GET request to grab our json
  $http({
    method: 'GET',
    url: 'data.json'
  }).then(
    function success(response) {
      $scope.buddies = response.data.buddies;
    },
    function error(err) {}
  );
  
  $scope.toggleExpand = function() {
    $scope.expanded = !$scope.expanded;
    $scope.expandTitle = $scope.expanded === false ? moreTxt : lessTxt;
  };
  
  $scope.setSort = function(str) {
    $scope.orderProp = str;
  };
  
  // Load our delete dialog box
  $scope.delete = function(buddy) {
    $scope.buddyToDelete = buddy;
    $scope.addBuddy = false;
    $scope.confirmDelete = true;
    $scope.dialogTitle = "Confirm Delete";
  };
  
  // Confirm buddy deletion
  $scope.deleteClick = function() {
    
    $scope.dialogTitle = "";
    
    for(var i = 0; i < $scope.buddies.length; i++) {
      if($scope.buddyToDelete.username === $scope.buddies[i].username) {
        $scope.buddies.splice(i, 1);
        break;
      }
    }
    $scope.cancel();
  };
  
  // Load our add dialox box
  $scope.add = function() {
    $scope.dialogTitle = "Create your own friend";
    $scope.confirmDelete = false;
    $scope.addBuddy = true;
  };
  
  $scope.cancel = function() {
    $scope.confirmDelete = false;
    $scope.addBuddy = false;
  };
  
  function clearInputs() {
    $('#username').val('');
    $('#first').val('');
    $('#last').val('');
    $('#email').val('');
    $('#birthday').val('');
    $('#bio').val('');
  }
  
  $scope.confirmAdd = function() {
    
    var buddy = [];
    buddy.username = $('#username').val();
    buddy.first = $('#first').val();
    buddy.last = $('#last').val();
    buddy.email = $('#email').val();
    buddy.birthday = $('#birthday').val();
    buddy.bio = $('#bio').val();
    buddy.status = "available";
    
    $scope.buddies.push(buddy);
    
    clearInputs(); 
    $scope.cancel(); 
  };
  
}]);
