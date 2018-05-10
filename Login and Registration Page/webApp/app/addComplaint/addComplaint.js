'use strict';

angular.module('webApp.addComplaint', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addComplaint', {
		templateUrl: 'addComplaint/addComplaint.html',
		controller: 'AddComplaintCtrl'
	});
}])

.controller('AddComplaintCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){

	// OPEN TO PUBLIC

	var ref = firebase.database().ref().child('Complaints');

	$scope.createComplaint = function(){
		 // extract date
		var d = new Date($scope.complaint.date);
        var date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();
        // extract time
		var t = new Date($scope.complaint.time);
		var time = t.getHours() + ":" + t.getMinutes();
		var place = $scope.complaint.place;
		var title = $scope.complaint.title;
		var description = $scope.complaint.description;
		var complainant = $scope.complaint.complainant;
		var contactNumber = $scope.complaint.contactNumber;
		var email = $scope.complaint.email;

		ref.push({
			date: date,
			time: time,
			place: place,
			title: title,
			description: description,
			complainant: complainant,
			contactNumber: contactNumber,
			email: email
		});

		console.log("Your complaint has been added");

	};

}]);