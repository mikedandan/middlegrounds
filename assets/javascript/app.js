// Initialize Firebase
var config = {
    apiKey: "AIzaSyAEOkd5JKDXjNJ5uwCIgbxasAWVf4hmgJM",
    authDomain: "meetup-c5cfa.firebaseapp.com",
    databaseURL: "https://meetup-c5cfa.firebaseio.com",
    projectId: "meetup-c5cfa",
    storageBucket: "meetup-c5cfa.appspot.com",
    messagingSenderId: "738857759873"
};
firebase.initializeApp(config);

var database = firebase.database();

var dataRef = database.ref().on("value", function (snapshot) {
    console.log("database: ", snapshot.val())
})

// innitial variables
var name = "";
var allEmail = [];
var allPeople = [];
var peopleLocation = [];



var people = $(".addPerson");

for (var i = 0; i < people.length; i++) {
    console.log($(people[i]).val());
}

var meetPlace = $("#inputPlace").val();

$(document).ready(function () {

    // Database Variables
    // All new users will be added to this array
    var allPeople = []
    var allEmails = []
    var meetPlace = []
    var max_fields = 10;
    var isSubmitted = false;
    var peopleLocation = [];
    var href = window.location.href;
    var url = new URL(href);
    var key = url.searchParams.get("key");


    var x = 1;
    //===========================================================================================
    // This button adds a new input field on the screen for multiple email addresses
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

    //===========================================================================================
    // This button deletes the input if you did not mean to add so many
    $(document).on("click", ".deletePerson", function (e) {
        e.preventDefault(); $(this).parent('div').remove();
        x--;
    });

    //===========================================================================================
    // This is the first button that creates the key on the index page. It also stores the name key
    $("#initInvite").on("click", function (event) {
        event.preventDefault();
        var name = $("#inputName").val();

        var newKey = database.ref().push({
            name: name
        });

        setTimeout(function () {
            window.location.assign("./sendinvite.html?key=" + newKey.key);
        }, 2000);
    });

    //===========================================================================================
    // This button adds an even title to the database. It adds emails to send messages containing lat/long link
    $("#sendInvite").on("click", function (event) {
        event.preventDefault();
        // var arr = [];
        // Capture User Inputs and store them into variables
        $(".addPerson").each(function (i, elem) {
            console.log(elem)
            allEmails.push($(elem).val());
        })
        $("#inputPlace").each(function (i, elem) {
            console.log(elem)
            meetPlace.push($(elem).val());
        });

        // Store Lat and Lng in array:
        console.log("People Location(before): ", peopleLocation);

        var eventName = $(".inputEvent").val();

        console.log("run")
        database.ref(key).update({
            // name: name,
            eventName: eventName,
            allEmails: allEmails,
            allPeople: allPeople,
            meetPlace: meetPlace,
            peopleLocation: peopleLocation
        });

        // This function gets the geolocation and stores it for later
        getLocation();
        console.log("People Location(after): ", peopleLocation);

        // setTimeout(function () {
        //     Email.send({
        //         Host: "smtp.elasticemail.com",
        //         Username: "mikedandan2@gmail.com",
        //         Password: "259229f0-3e5b-4da2-b869-c6009ef1a5ea",
        //         To: ['mikedandan2@gmail.com', 'webseoinc@gmail.com'],
        //         From: "mikedandan2@gmail.com",
        //         Subject: "IT WORKS!!",
        //         Body: "We can now email!"
        //     }).then(
        //         message => alert(message)
        //     );
        // }, 2000);

        setTimeout(function () { window.location.assign("./waiting.html?key=" + key); }, 5000);

    });
    //================================================================================
    // This lets everyone know that you have checked in and provided your geolocation
    $("#newRecipient").on("click", function (event) {
        event.preventDefault();



        if (isSubmitted == false) {
            // remove current HTML
            $(".addPresent").html("");

            $(this).addClass("grey");
            var newPersonName = $("#inputRecipientName").val();

            var newNameDiv = $("<div class='col s4 m4 l4'>");
            var newName = $("<h4 class='present'>").text(newPersonName);

            newNameDiv.append(newName);

            allPeople.push(newPersonName);

            geolocation();

            // allPeople = ["the", "only", "one"];

            database.ref(key).once("value")
                .then(function (snapshot) {
                    var val = snapshot.val().allPeople;
                    console.log(snapshot.val());

                    val.push(newPersonName);

                    console.log(val);

                    database.ref(key).update({
                        allPeople: val
                    });

                    // for (var i = 0; i < val.length; i++) {
                    //     var newNameDiv = $("<div class='col s12 m3 l3'>");
                    //     var newName = $("<h4 class='present'>").html(allPeople[i]);
                    //     newNameDiv.append(newName);
                    //     $(".addPresent").append(newNameDiv); //add input box
                    // }
                })


            isSubmitted = true;
            console.log(isSubmitted);
        } else {
            // return;
            event.preventDefault();
            console.log(isSubmitted);
        }



    });
    //=========================================================================
    // this buttons takes you to the map using the data we collected in the database
    $("#mapMeNow").on("click", function (event) {
        event.preventDefault();

        // // take me to map page with lat lng var added
        // var href = window.location.href;
        // var url = new URL(href);
        // var key = url.searchParams.get("key");
        setTimeout(function () { window.location.assign("./selectMiddle.html?key=" + key); }, 2000);
    });

    //=======================================================================
    // This button grabs the selected destination and adds it to the database which should populate on all other screens
    // $(document).on("click", ".mapLink", function (e) {
    //     e.preventDefault();
    //     var newLocation = $(this).attr(href);
    //     database.ref(key).set({
    //         meetUpLink: meetUpLink
    //     });
    // });

    //=========================================================================
    // This series of functions gathers the Latitude and Longitude of the user
    var x = document.getElementById("error-handling");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position, callback) {

        var newLatLng = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        peopleLocation.push(newLatLng);
        console.log("People Location(inside): ", peopleLocation);
        function callback() {
            console.log("did this work?");
        }

    }
    function showError(error) {
        console.log(error)
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }

});
