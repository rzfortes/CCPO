'use strict';

angular.module('webApp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/welcome', {
		templateUrl: 'welcome/welcome.html',
		controller: 'WelcomeCtrl'
	});
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$firebaseArray', function($scope, CommonProp, $firebaseArray){

	$scope.username = CommonProp.getUser();

	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);

}])