'use restrict';

angular.module('webApp.register', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/register', {
		templateUrl: 'register/register.html',
		controller: 'RegisterCtrl'
	});
}])

.controller('RegisterCtrl', ['$scope', 'CommonProp', '$firebaseAuth', '$firebaseArray', '$location', function($scope, CommonProp, $firebaseAuth, $firebaseArray, $location){
	$scope.signUp = function(){
		var userEmail = $scope.user.email;
		var password = $scope.user.password;

		var username = $scope.user.name;
		var rank = $scope.user.rank;
		var substation = $scope.user.substation;
		var superiorOfficer = $scope.user.superiorOfficer;

		if(userEmail && password){
			var auth = $firebaseAuth();
			auth.$createUserWithEmailAndPassword(userEmail, password).then(function(){
				// get the uid
				var user = firebase.auth().currentUser;
				// add additional info
				var ref = firebase.database().ref().child('Users').child(user.uid);
				// $scope.users = $firebaseArray(ref);
				ref.set({
					name: username,
					rank: rank,
					substation: substation,
					superiorOfficer: superiorOfficer,
					email: userEmail
				});
				console.log("User succefully created: " + user.uid);
				$location.path('/login');
			}).catch(function(error){
				$scope.errMsg = true;
				$scope.errorMessage = error.message;
			});
		}
	}

	$scope.username = CommonProp.getUser();
	
}])