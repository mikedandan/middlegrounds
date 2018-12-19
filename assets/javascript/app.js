var config = {
    apiKey: "AIzaSyAEOkd5JKDXjNJ5uwCIgbxasAWVf4hmgJM",
    authDomain: "meetup-c5cfa.firebaseapp.com",
    databaseURL: "https://meetup-c5cfa.firebaseio.com",
    projectId: "meetup-c5cfa",
    storageBucket: "meetup-c5cfa.appspot.com",
    messagingSenderId: "738857759873"
};
firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
var database = firebase.database();

// Capture Button Click
$("#sendInvite").on("click", function (event) {
    event.preventDefault();
    // Capture User Inputs and store them into variables

    var name = $("#inputName").val();
    var eventName = $("#inputEvent").val();

    // var people = $(".addPerson").val();

    var people = $(".addPerson");

    for (var i = 0; i < people.length; i++) {
        console.log($(people[i]).val());
    }

    var meetPlace = $("#inputPlace").val();

    // Console log each of the user inputs to confirm we are receiving them correctly
    // console.log(name, eventName, people, meetPlace);
    // console.log(people);

    // database.ref().push({
    //     name: name,
    //     eventName: eventName,
    //     people: people,
    //     meetPlace: meetPlace
    // });
});
$(document).ready(function () {
    console.log("hey")
    var bounds = new google.maps.LatLngBounds();
    bounds.extend({
        lat: 40.712776,
        lng: -74.005974
    })
    bounds.extend({
        lat: 37.774929,
        lng: -122.419418
    })
    bounds.extend({
        lat: 23.634501,
        lng: -102.552788
    })  
    console.log("mid point:",bounds.getCenter().lat(),bounds.getCenter().lng());
    var midpoint = [bounds.getCenter().lat(),bounds.getCenter().lng()]
    console.log("Mid point: " + midpoint);



    // Database Variables:
    // All new users will be added to this array
    var allPeople = []

    var max_fields = 10;


    var x = 1;
    $("#addPersonDiv").click(function (e) {
        e.preventDefault();
        if (x < max_fields) {
            var addPerson = $("<div class='input-field col s12 m12 center-align newPersonDiv'>");
            var newInput = $("<input placeholder='Phone Number or Email' type='text' class='validate addPerson'>");
            // if you change the <a> tag to a <button> tag it works, but refreshes the page everytime you press it :(
            var deleteBtn = $("<a class='deletePerson'>").html("<i class='material-icons'>delete_forever</i>");
            addPerson.append(deleteBtn, newInput);
            $("#addPeople").append(addPerson); //add input box
            x++;

        }
        else {
            alert('You Reached the limits')
        }
    });

    $(document).on("click", ".deletePerson", function (e) {
        e.preventDefault(); $(this).parent('div').remove();
        x--;
    });
    // Add new users to the allPeople array
    $(function() { //shorthand document.ready function
    $('#login_form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        var data = $("#login_form :input").serializeArray();
        console.log(data); //use the console for debugging, F12 in Chrome, not alerts
    });
});
});

