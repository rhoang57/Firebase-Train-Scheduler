//Initialize Firebase
var config = {
    apiKey: "AIzaSyBylNVk0Sr0V8hwfPCguRZonYloQlLqyxk",
    authDomain: "trainschedule-218a1.firebaseapp.com",
    databaseURL: "https://trainschedule-218a1.firebaseio.com",
    projectId: "trainschedule-218a1",
    storageBucket: "trainschedule-218a1.appspot.com",
    messagingSenderId: "673902777663"
  };
  firebase.initializeApp(config);

//Create a variable to reference the Firebase database
var database = firebase.database();

//Create a button for adding a train and prevents the page from reloading upon click
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Create variables to grab user input for train
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#firstTrain-input").val().trim(), "h:mm A").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();

    //Creating a local object "newTrain" that will hold the user's input
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        trainTime: firstTrainTime,
        frequency: trainFrequency
    };

    //Uploads newTrain object data to the Firebase database
    database.ref().push(newTrain);

    //Print to each piece of data to the console
    /*console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);*/

    alert("The " + newTrain.name + " train has been successfully added to the schedule");

    //Clear all of the text-boxes after alert 
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});

/*Create Firebase event for adding train to the database 
and a row in the html when a user adds an entry*/
database.ref().on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());

    //Store everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().trainTime;
    var trainFrequency = childSnapshot.val().frequency;

    //Console log the train information
    /*console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);*/

    //First Time (using a time from 1 year ago to make sure it is not choosing the current time)
    var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    //console.log("first Train converted: " + firstTrainTimeConverted);

    //Current Time
    var currentTime = moment();
    //console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    //Creating a variable for the difference between the times
    var timeDiff = moment().diff(moment(firstTrainTimeConverted), "minutes");
    //console.log("Difference in time: " + timeDiff);

    //Time apart (remainder)
    var timeRemainder = timeDiff % trainFrequency;
    //console.log(timeRemainder);

    //Minutes away until the next train
    var minutesTilTrain = trainFrequency - timeRemainder;
    //console.log("Minutes until the next train: " + minutesTilTrain);

    //Next train arrival 
    var nextTrain = moment().add(minutesTilTrain, "minutes").format("HH:mm");
    //console.log("Time til next train: " + nextTrain);

    //Create a new row for the new train data
    var newTrainRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesTilTrain)
    );

    //Append the new row with the added data to the table body and add current time to
    $("#train-table").append(newTrainRow);
    $("#current-time").text("Current Time: " + moment().format("HH:mm"));

    });