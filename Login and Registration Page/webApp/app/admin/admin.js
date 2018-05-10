'use strict';

angular.module('webApp.admin', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/admin', {
		templateUrl: 'admin/admin.html',
		controller: 'AdminCtrl'
	});
}])

.controller('AdminCtrl', ['$scope', '$firebaseArray', 'CommonProp', '$timeout', '$location', function($scope, $firebaseArray, CommonProp, $timeout, $location){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/login');
	}

	var user = firebase.auth().currentUser;

	firebase.auth().onAuthStateChanged(function(user) {
	  if (user != null) {
		var announcements_ref = firebase.database().ref().child('Announcements');//.orderByChild('priority').limitToFirst(5);
		
		// retrieve announcements, instead of retrieving one by one; used firebaseArray instead
		$scope.announcements = $firebaseArray(announcements_ref);
		
		var complaints_ref = firebase.database().ref().child('Complaints');//.orderByChild('priority').limitToFirst(5);
		
		// retrieve complaints, instead of retrieving one by one; used firebaseArray instead
		$scope.complaints = $firebaseArray(complaints_ref);

	    // User is signed in.
		var ref = firebase.database().ref().child('Users');

		// retrieve user details
		ref.child(user.uid).on("value", function(snapshot) {
		  $timeout(function(){
			$scope.name = snapshot.val().name;
			$scope.rank = snapshot.val().rank;
			$scope.substation = snapshot.val().substation;
			$scope.superiorOfficer = snapshot.val().superiorOfficer;
		  });
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

		var ref2 = firebase.database().ref().child('Reports');
		var current_uid = user.uid;

		// bar chart for number of reports by category per month [year 2018]
		$scope.labels = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
		$scope.series = ['Personal', 'Property', 'Inchoate', 'Statutory'];

		$scope.data = [
		  [65, 59, 80, 81, 56, 55, 40],
		  [28, 48, 40, 19, 86, 27, 90],
		  [40, 90, 10, 60, 20, 10, 60],
		  [1, 2, 3, 4, 5, 6, 7]
		];

	  } else {
	    // No user is signed in.
	    // console.log("No user is signed in.");
	  }
	});

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}])
