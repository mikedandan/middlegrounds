$(document).ready(function () {

    // Database Variables:
    // All new users will be added to this array
    var allPeople = []

    var max_fields = 10;


    var x = 1;
    $("#addPersonDiv").click(function (e) {
        e.preventDefault();
        if (x < max_fields) {
            var addPerson = $("<div class='input-field col s12 m12 center-align newPersonDiv'>");
            var newInput = $("<input placeholder='Phone Number or Email' type='text' class='validate'>");
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

