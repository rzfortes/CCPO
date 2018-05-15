'use strict';

angular.module('webApp.login', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/login', {
		templateUrl: 'login/login.html',
		controller: 'LoginCtrl'
	});
}])

.controller('LoginCtrl', ['$scope', '$firebaseAuth', '$location', 'CommonProp', function($scope, $firebaseAuth, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if($scope.username){
		if($scope.username === "admin@ccpo.ph"){
			$location.path('/admin');
		} else {
			$location.path('/profile');
		}
	}
	
	$scope.signIn = function(){
		var username = $scope.user.email;
		var password = $scope.user.password;
		var auth = $firebaseAuth();

		auth.$signInWithEmailAndPassword(username, password).then(function(){
			console.log("User login successful");
			CommonProp.setUser($scope.user.email);
			// $scope.errMsg = false;
			if(username === "admin@ccpo.ph"){
				$location.path('/admin');
			} else {
				$location.path('/profile');
			}
		}).catch(function(error){
			$scope.errMsg = true;
			$scope.errorMessage = error.message;
		});
	}

}])

.service('CommonProp', ['$location', '$firebaseAuth', function($location, $firebaseAuth){
	var user = "";
	var auth = $firebaseAuth();

	return {
		getUser: function(){
			if(user == ""){
				user = localStorage.getItem("userEmail");
			}
			return user;
		},
		setUser: function(value){
			localStorage.setItem("userEmail", value)
			user = value;
		},
		logoutUser: function(){
			auth.$signOut();
			console.log("Logged out successfully");
			user = "";
			localStorage.removeItem('userEmail');
			$location.path('login/');
		}
	};
}]);