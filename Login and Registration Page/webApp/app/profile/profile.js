'use strict';

angular.module('webApp.profile', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/profile', {
		templateUrl: 'profile/profile.html',
		controller: 'ProfileCtrl'
	});
}])

.controller('ProfileCtrl', ['$scope', 'CommonProp', '$timeout', '$location', function($scope, CommonProp, $timeout, $location){
	
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/login');
	}

	var user = firebase.auth().currentUser;

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user != null) {
	    // User is signed in.
		var ref = firebase.database().ref().child('Users');

		// retrieve user details
		ref.child(user.uid).on("value", function(snapshot) {
		  $timeout(function(){
			$scope.name = snapshot.val().name;
			console.log("name: " + $scope.name);
			$scope.rank = snapshot.val().rank;
			console.log("rank: " + $scope.rank);
			$scope.substation = snapshot.val().substation;
			console.log("substation: " + $scope.substation);
			$scope.superiorOfficer = snapshot.val().superiorOfficer;
			console.log("superiorOfficer: " + $scope.superiorOfficer)
		  });
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

		var ref2 = firebase.database().ref().child('Reports');
		var current_uid = user.uid;
		// retrieve reports
		ref2.orderByChild('uid').equalTo(current_uid).on("child_added", function(snapshot) {
		  $timeout(function(){
		  	$scope.date = snapshot.val().date;
		  	$scope.time = snapshot.val().time;
		  	$scope.place = snapshot.val().place;
		  	$scope.title = snapshot.val().title;
		  	$scope.category = snapshot.val().category;
		  	$scope.crime = snapshot.val().crime;
		  	$scope.description = snapshot.val().description;
		  	$scope.complainant = snapshot.val().complainant;
		  	$scope.receivingOfficer = snapshot.val().receivingOfficer;
		  	$scope.respondent = snapshot.val().respondent;
		  	$scope.uid = snapshot.val().uid;
		  });
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

	  } else {
	    // No user is signed in.
	    // console.log("No user is signed in.");
	  }
	});

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}])