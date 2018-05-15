'use strict';

angular.module('webApp.home', ['ngRoute', 'firebase', "chart.js", 'ui.calendar'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$compile', 'uiCalendarConfig', '$firebaseArray', function($scope, $compile, uiCalendarConfig, $firebaseArray){

	var roofRef = firebase.database().ref().child("Announcements");

	$scope.events = $firebaseArray(roofRef);

    /* alert on eventClick */
    $scope.alertOnEventClick = function(date, jsEvent, view) {
      $scope.alertMessage = (date.title + ' was clicked ');
    };
    
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
      console.log('event', event);
      console.log('view', view);
      $scope.alertMessage = ('Event Droped to make ' + delta._days + 'day delta and ' + delta._months + ' month delta');
      if (event.editable === false)
        revertFunc();
    };

    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
      console.log('event', event);
      console.log('view', view);
      $scope.alertMessage = ('Event Droped to make ' + delta._days + 'day delta and ' + delta._months + ' month delta');
      if (event.editable === false)
        revertFunc();
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index, 1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
    };

    /* Change View */
    $scope.renderCalender = function(calendar) {
      if (uiCalendarConfig.calendars[calendar]) {
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };

    /* Render Tooltip */
    $scope.eventRender = function(event, element, view) {
      element.attr({
        'tooltip': event.title,
        'tooltip-append-to-body': true
      });
      $compile(element)($scope);
    };

    /* config object */
    $scope.uiConfig = {
      calendar: {
        selectable: false,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        header: {
          left: 'title',
          center: '',
          right: 'prev,today,next month,agendaWeek,agendaDay'
        },
        eventClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventRender: $scope.eventRender
      }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events];


	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
	$scope.series = ['Series A'];
	$scope.data = [
	  [65, 59, 80, 81, 56, 55, 40]
	];
	// $scope.onClick = function (points, evt) {
	//   console.log(points, evt);
	// };
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	$scope.options = {
	  scales: {
	    yAxes: [
	      {
	        id: 'y-axis-1',
	        type: 'linear',
	        display: true,
	        position: 'left'
	      }
	    ]
	  }
	};

	// to retrieve according to date of activity, add: .orderByChild("date")
	// to limit up to 10 only, add: .limitToLast(10)

	// retrieve by the latest added announcement
	// still in ascending order
	roofRef.orderByChild("priority").on("child_added", snap => {

		var what = snap.child("title").val();
		var date_when = snap.child("date").val();
		var time_when = snap.child("time").val();
		var where = snap.child("place").val();
		var what_details = snap.child("details").val();

		var large_string = 
		'<br><div class="modal-content"><div class="modal-header"><h5 class="modal-title text-center" id="exampleModalLabel">' + what + '</h5></div><div class="modal-body"><div class="typography-line"><h6>' +date_when+ '</h6></div><br> <div class="typography-line"><h6>' +time_when+ '</h6> <br> <div class="typography-line"><h6>' +where+ '</h6> <br>' +what_details+ '</div> </div><br>';

		$("#summary").append(large_string);
})

}])