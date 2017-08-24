//Clock for HTML Page

function updateClock() {

var clock = moment().format("h:mm:ss a");

var c = $("<h2>");
var c2 = c.append(clock);
$("#clock").html(c2);

};

setInterval(updateClock, 1000);

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

// capture button click
$("#submit-button").on("click", function(event) {
event.preventDefault();

newDest = $("#new-dest").val().trim();
firstTrain = moment($("#new-time").val().trim(), "hh:mm a").format("HH:mm");
newFreq = $("#new-freq").val().trim();
newTrain = $("#new-name").val().trim();

//handling the data push

dataRef.ref().push({

	newTrain: newTrain,
	firstTrain: firstTrain,
	newFreq: newFreq,
	newDest: newDest,
	dateAdded: firebase.database.ServerValue.TIMESTAMP
});
// alert("Form submitted!");

  // Empty text input
  $("#new-dest").val("");
  $("#new-time").val("");
  $("#new-freq").val("");
  $("#new-name").val("");


dataRef.ref().on("child_added", function(childSnapshot) {
    // console.log(childSnapshot.val());
  var newTrain = childSnapshot.val().newTrain;
  var firstTrain = childSnapshot.val().firstTrain;
  var newFreq = childSnapshot.val().newFreq;
  var newDest = childSnapshot.val().newDest;

//calculating the next train and min away
// First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

  // Time apart (remainder)
  var tRemainder = diffTime % newFreq;

  // Minute Until Train
  var minutesAway = newFreq - tRemainder;

  // getting next arrival time
  var nextArrival = moment().add(minutesAway, "minutes");

  var nextArrival2 = moment(nextArrival).format("hh:mm");

  var nextArrivalUpdate = function() {
    date = moment(new Date())
    datetime.html(date.format('hh:mm a'));
  }

// adding the new train to the table

$("#train-sched > tbody").append("<tr><td>" + newTrain + "</td><td>" 
+ newDest + "</td><td>" + newFreq + "</td><td>" + nextArrival2 + "</td><td>" 
+ minutesAway + "</td></tr>");

  });

});