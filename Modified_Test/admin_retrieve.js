var newsRef = firebase.database().ref().child("Announcements");

//everytime a news item is added
newsRef.orderByChild("date").on("child_added", snap => {

	var name = snap.child("Name").val();
	var email = snap.child("Email").val();

	var what = snap.child("title").val();
	var date_when = snap.child("date").val();
	var time_when = snap.child("time").val();
	var where = snap.child("place").val();
	var what_details = snap.child("details").val();

	var ex = snap.key;
	console.log(ex);
	var large_string = '<tr><td>'+what+'</td><td>'+date_when+ '</td><td>' + time_when+ '</td><td>'+ where+ '</td><td>' + what_details+'</td><td class = "waves-effect waves-light btn" onclick="newsRef.child('+'&quot'+ex+'&quot'+').remove();">'+'Delete'+ '</td></tr>';
	

	$("#activities").append(large_string);
})

