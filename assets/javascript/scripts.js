  // Initialize Firebase
var config = {
    apiKey: "AIzaSyDBoEuZy2xHWovVi1DlD99ad14R6mFk0kA",
    authDomain: "practice-project-a26be.firebaseapp.com",
    databaseURL: "https://practice-project-a26be.firebaseio.com",
    projectId: "practice-project-a26be",
    storageBucket: "practice-project-a26be.appspot.com",
    messagingSenderId: "596453096414"
  };

firebase.initializeApp(config);

var dataRef = firebase.database();

// inital values
var newDest = "";
var firstTrain = "";
var newFreq = "";
var newTrain = "";
var nextArrive = 0;
var minutesAway = 0;

// capture button click
$("#submit-button").on("click", function(event) {
event.preventDefault();

newDest = $("#new-dest").val().trim();
firstTrain = moment($("#new-time").val().trim(), "hh:mm a").format("HH:mm");
newFreq = $("#new-freq").val().trim();
newTrain = $("#new-name").val().trim();


//calculating the next train and min away
// First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");


  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");


  // Time apart (remainder)
  var tRemainder = diffTime % newFreq;


  // Minute Until Train
  var minutesAway = newFreq - tRemainder;


  // Next Train
  var nextArrive = moment().add(minutesAway, "minutes");


  // Arrival time
  var arriveTime = moment(nextArrive).format("hh:mm a");

  var nextArrivalUpdate = function() {
    date = moment(new Date())
    datetime.html(date.format('hh:mm a'));
  }

//handling the data push

dataRef.ref().push({

	newTrain: newTrain,
	firstTrain: firstTrain,
	newFreq: newFreq,
	newDest: newDest,
	dateAdded: firebase.database.ServerValue.TIMESTAMP
	// dateAdded: firebase.database.ServerValue.TIMESTAMP 
});
// alert("Form submitted!");

  // Empty text input
  $("#new-dest").val("");
  $("#new-time").val("");
  $("#new-freq").val("");
  $("#new-name").val("");


dataRef.ref().on("child_added", function(childSnapshot) {

	console.log(childSnapshot.val().newTrain);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().newFreq);
    console.log(childSnapshot.val().newDest);
  

});

// adding the new train to the table

$("#train-sched > tbody").append("<tr><td>" + newTrain + "</td><td>" 
+ newDest + "</td><td>" + newFreq + "</td><td>" +  
+ "</td><td>" + nextArrive + "</td></td>" +  
+ "</td><td>" + arriveTime + "</td></tr>");

});

