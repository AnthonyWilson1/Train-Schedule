var config = {
    apiKey: "AIzaSyBrJou8Z7TyM31C7ZomEf2HVVwGjo1aG0A",
    authDomain: "fir-hm-75ba4.firebaseapp.com",
    databaseURL: "https://fir-hm-75ba4.firebaseio.com",
    storageBucket: "fir-hm-75ba4.appspot.com"
  };

firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";

function converter(m) {
    var mil = 1000
    var sec = 60
    var one = m/mil
    var two = one/sec
    return Math.round(two)
}    


function timeRemaining(param) {
   var minutes = converter(param); 
   var factor = minutes % frequency
   var timeLeft = frequency-factor
   return timeLeft;
} 


function converter2(m) {
    var mil = 1000
    var sec = 60
    var one = m * sec
    var two = one * mil
    return two;
}

$(document).on("click","#button", function() {
    event.preventDefault();
    trainName = $("#Input").val().trim();
    destination = $("#Input2").val().trim();
    firstTrain = $("#Input3").val().trim();
    frequency = $("#Input4").val().trim();
    
     database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        
    });
});

database.ref().on("child_added", function(snapshot) {
  name = snapshot.val().name;
  destination = snapshot.val().destination;
  frequency = snapshot.val().frequency;  
  firstTrain = snapshot.val().firstTrain;  

  var day = moment().date();
  var month = moment().month() + 1;
  var year = moment().year();
  var dateString = year + "-" + month + "-" + day + " ";
  var final = moment(dateString + firstTrain);
  var nextArrival = moment(final).clone().add(frequency, "minutes").format("LT"); var mili = moment(final).valueOf();
  var now = moment().valueOf(); 
  var sum = now - mili;
  var timeLeft = timeRemaining(sum);
  var nextArrival = converter2(timeLeft);
  var nowFinal = moment().add(timeLeft, "minutes").format("LT");

  var row = $("<tr>")
  var td = $("<td>")
  var td2 = $("<td>")
  var td3 = $("<td>")
  var td4 = $("<td>")
  var td5 = $("<td>")

  td.text(name)
  td2.text(destination)
  td3.text(frequency)
  td4.text(nowFinal)
  td5.text(timeLeft)

  row.append(td)
  row.append(td2)
  row.append(td3)
  row.append(td4)
  row.append(td5)

  $("#list").append(row)
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
}); 

