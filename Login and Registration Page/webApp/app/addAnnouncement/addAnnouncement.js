'use strict';

angular.module('webApp.addAnnouncement', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addAnnouncement', {
		templateUrl: 'addAnnouncement/addAnnouncement.html',
		controller: 'AddAnnouncementCtrl'
	});
}])

.controller('AddAnnouncementCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp', function($scope, $firebaseArray, $location, CommonProp){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/login');
	}

	var user = firebase.auth().currentUser;
	var ref = firebase.database().ref().child('Announcements');

	firebase.auth().onAuthStateChanged(function(user){
		if(user != null){

			// retrieve reports, instead of retrieving one by one; used firebaseArray instead
			$scope.announcements = $firebaseArray(ref);

		} else {
			// user is not signed in
		}
	})

	$scope.deleteAnnouncement = function(announcement){
		$scope.announcements.$remove(announcement);
	}

	$scope.createAnnouncement = function(){

		// extract first date and time
		var d = new Date($scope.announcement.date);
        var date = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
		var t = new Date($scope.announcement.time);
		var time = ("0" + t.getHours()).slice(-2) + ":" + ("0" + t.getMinutes()).slice(-2);

		var title = $scope.announcement.title;
		var place = $scope.announcement.place;
		var details = $scope.announcement.details;

		console.log("date: " + date);
		console.log("time: " + time);
		console.log("place: " + place);
		console.log("title: " + title);
		console.log("details: " + details);

		ref.push({
          // priority makes it easier to sort the announcements in descending order based on the time it was added
          priority: 0 - Date.now(),
          title: title,
          time: time,
          date: date,
          place: place,
          details: details,
          stick: true
        });

		console.log("Announcement added");
		// $location.path('/addAnnouncement');
		$location.path('/admin');

	};

	$scope.logout = function(){
		CommonProp.logoutUser();
	}

}]);