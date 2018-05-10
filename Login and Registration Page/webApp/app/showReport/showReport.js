'use strict';

angular.module('webApp.showReport', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/showReport', {
		templateUrl: 'showReport/showReport.html',
		controller: 'ShowReportCtrl'
	});
}])

.controller('ShowReportCtrl', ['$scope', 'CommonProp', '$timeout', '$location', '$firebaseArray', function($scope, CommonProp, $timeout, $location, $firebaseArray){
	
	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/login');
	}

	var user = firebase.auth().currentUser;

	firebase.auth().onAuthStateChanged(function(user){
		if(user != null){

			var current_uid = user.uid;
			var ref2 = firebase.database().ref().child('Reports').orderByChild('uid').equalTo(current_uid);

			// retrieve reports, instead of retrieving one by one; used firebaseArray instead
			$scope.reports = $firebaseArray(ref2);

		} else {
			// user is not signed in
		}
	})
	
	$scope.deleteReport = function(report){
		$scope.reports.$remove(report);
	}

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}])