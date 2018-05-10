var input_date = $('.datepicker').val();

var roofRef = firebase.database().ref().child("news");

// to retrieve according to date of activity, add: .orderByChild("date")
// to limit up to 10 only, add: .limitToLast(10)

// retrieve by the latest added announcement
// still in ascending order
roofRef.orderByChild("priority").on("child_added", snap => {
	// console.log(input_date);
	// var name = snap.child("Name").val();
	// var email = snap.child("Email").val();

	var what = snap.child("title").val();
	var date_when = snap.child("date").val();
	var time_when = snap.child("time").val();
	var where = snap.child("place").val();
	var what_details = snap.child("details").val();

	var large_string = 
	'<div class="col s12 m7"><div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="Out There 1920x1080.jpg"><span class="card-title">' + what + '</span></div><div class="card-content"><p>' + what + ' on "' + date_when + ", " + time_when + " at " + where + '"</p></div><div style="opacity: 0.7" class="card-reveal"><span class="card-title grey-text text-darken-4">News Flash<i class="material-icons right">close</i></span><p>' + what_details + '</p></div></div></div>';

	$("#summary").append(large_string);
})