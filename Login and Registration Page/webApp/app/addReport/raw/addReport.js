'use strict';

angular.module('webApp.addReport', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addReport', {
		templateUrl: 'addReport/addReport.html',
		controller: 'AddReportCtrl'
	});
}])

.controller('AddReportCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/login');
	}

	var user = firebase.auth().currentUser;
	var ref = firebase.database().ref().child('Reports');

	$scope.createReport = function(){
		 // extract date
		var d = new Date($scope.report.date);
        var date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        // extract time
		var t = new Date($scope.report.time);
		var time = t.getHours() + ":" + t.getMinutes();

		var place = $scope.report.place;
		var title = $scope.report.title;
		var category = $scope.report.category;
		var crime = $scope.report.crime;
		var description = $scope.report.description;
		var complainant = $scope.report.complainant;
		var receivingOfficer = $scope.report.receivingOfficer;
		var respondent = $scope.report.respondent;

		ref.push({
			date: date,
			time: time,
			place: place,
			title: title,
			category: category,
			crime: crime,
			description: description,
			complainant: complainant,
			receivingOfficer: receivingOfficer,
			respondent: respondent,
			uid: user.uid
		});

		console.log("Report added");
		$location.path('/profile');

	};

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}]);