$(document).ready(function(){
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAsjat8dvNUVTUS7FCcQrh7PXNp7o4ko54",
    authDomain: "train-time-b2b6d.firebaseapp.com",
    databaseURL: "https://train-time-b2b6d.firebaseio.com",
    projectId: "train-time-b2b6d",
    storageBucket: "train-time-b2b6d.appspot.com",
    messagingSenderId: "397068716727"
};
firebase.initializeApp(config);
//creating my variable to refrence my database
var dataRef = firebase.database();
//creating a onclick function for our submit
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    //Our variables that refrence our users input
    var trainName = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var timeStart = $("#start-date").val().trim();
    var frequency = $("#rate").val().trim();
    // coversions
    var minutesFormat = moment(timeStart, "hh:mm").subtract(1, "years");
    currentTime = moment();
    var timeToarrival = moment().diff(moment(minutesFormat), "minutes");
    var tRemainder = timeToarrival % frequency;
    var minutesAway = frequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextTrainFormat = moment(nextTrain).format("hh:mm");
    //creating tables variables to then refrence them after and append
    var rowAdd = $('<tr>');
    var namehead = $('<td>');
    namehead.html(trainName);

    var destinationData = $('<td>');
    destinationData.html(destination);

    var timeData = $('<td>');
    timeData.html(frequency);


    var frequencyData = $('<td>');
    frequencyData.html(nextTrainFormat);

    var MinutesAwayData = $('<td>');
    MinutesAwayData.html(minutesAway);


    $('tbody').append(rowAdd);

    dataRef.ref().push({
        name: trainName,
        dest: destination,
        time: nextTrainFormat,
        frequency: frequency,
        ETA: minutesAway,

        dateAdded: firebase.database.ServerValue.TIMESTAMP
        
    });

});
dataRef.ref().on("child_added", function (snapshot) {
    var newPost = snapshot.val();

    console.log("Name: " + newPost.name);
    console.log("destination: " + newPost.dest);
    console.log("time: " + newPost.time);
    console.log("frequency:" + newPost.freq);
    console.log("Minutes Away:" + newPost.ETA);

    // append the values stored in database to the table body
    $(".table > tbody").append("<tr><td>" + newPost.name + "</td><td>" + newPost.dest + "</td><td>" + newPost.frequency + "</td><td>" + newPost.time + "</td><td>" + newPost.ETA + "</td></tr>");
});


});

