'use strict';

angular.module('webApp.showComplaint', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/showComplaint', {
		templateUrl: 'showComplaint/showComplaint.html',
		controller: 'ShowComplaintCtrl'
	});
}])

.controller('ShowComplaintCtrl', ['$scope', 'CommonProp', '$timeout', '$location', '$firebaseArray', function($scope, CommonProp, $timeout, $location, $firebaseArray){
	
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/login');
	}

	var user = firebase.auth().currentUser;
	var ref2 = firebase.database().ref().child('Complaints');

	firebase.auth().onAuthStateChanged(function(user){
		if(user != null){

			// retrieve reports, instead of retrieving one by one; used firebaseArray instead
			$scope.complaints = $firebaseArray(ref2);

		} else {
			// user is not signed in
		}
	})
	
	$scope.deleteComplaint = function(complaint){
		$scope.complaints.$remove(complaint);
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}])