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

// var name = $("#inputName").val();
// var eventName = $("#inputEvent").val();

// var people = $(".addPerson").val();

var people = $(".addPerson");

for (var i = 0; i < people.length; i++) {
    console.log($(people[i]).val());
}

var meetPlace = $("#inputPlace").val();


$(document).ready(function () {




    // Database Variables:
    // All new users will be added to this array
    var allPeople = []
    var meetPlace = []
    var max_fields = 10;
    var isSubmitted = false;


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

    $("#initInvite").on("click", function (event) {
        event.preventDefault();
        var allPeopleVal = [$("#inputName").val()];

        var newKey = database.ref().push({
            allPeople: allPeopleVal,
        });


        console.log(newKey.key);
        window.location.assign("./sendinvite.html?key=" + newKey.key);



    });

    $("#sendInvite").on("click", function (event) {
        event.preventDefault();
        // var arr = [];
        // Capture User Inputs and store them into variables
        // $(".addPerson").each(function (i, elem) {
        //     console.log(elem)
        //     allPeople.push($(elem).val());
        // })
        $("#inputPlace").each(function (i, elem) {
            console.log(elem)
            meetPlace.push($(elem).val());
        });

        var href = window.location.href;

        // console.log(href);
        var url = new URL(href);
        var key = url.searchParams.get("key");
        console.log(key);

        var eventName = $(".inputEvent").val();
        // var people = $(".addPerson").val();
        // var meetPlace = $("#inputPlace").val();
        // Console log each of the user inputs to confirm we are receiving them correctly
        console.log(eventName, allPeople, meetPlace);
        console.log("run")
        database.ref(key).update({
            // name: name,
            eventName: eventName,
            // allPeople: allPeople,
            meetPlace: meetPlace
        });
        console.log(key);
        window.location.assign("./waiting.html?key=" + key);
    });
    $("#newRecipient").on("click", function (event) {
        event.preventDefault();

        

        if (isSubmitted == false) {
            // remove current HTML
         $(".addPresent").html("");

            $(this).addClass("grey");
            var newPersonName = $("#inputRecipientName").val();

            // var newNameDiv = $("<div class='col s3 m3 l3'>");
            // var newName = $("<h4 class='present'>").text(newPersonName);

            // newNameDiv.append(newName);

            // allPeople.push(newPersonName);

            var href = window.location.href;

            var url = new URL(href);
            var key = url.searchParams.get("key");

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
                    
                    for (var i = 0; i < val.length; i++) {
                        var newNameDiv = $("<div class='col s3 m3 l3'>");
                        var newName = $("<h4 class='present'>").html(allPeople[i]);
                        newNameDiv.append(newName);
                        $(".addPresent").append(newNameDiv); //add input box
                    }
                })


            isSubmitted = true;
            console.log(isSubmitted);
        } else {
            // return;
            event.preventDefault();
            console.log(isSubmitted);
        }



    });
    // gettind dat info from the database
    var href = window.location.href;
    var url = new URL(href);
    var key = url.searchParams.get("key");

    database.ref(key).on("value", function(childSnapshot) {
        // remove current HTML
        $(".addPresent").html("");
        console.log(childSnapshot.val());

        var val = childSnapshot.val().allPeople;
        console.log(val);

        for (var i = 0; i < val.length; i++) {
            var newNameDiv = $("<div class='col s3 m3 l3'>");
            var newName = $("<h4 class='present'>").html(val[i]);
            newNameDiv.append(newName);
            $(".addPresent").append(newNameDiv);
            }    //add input box
        

    });
});

