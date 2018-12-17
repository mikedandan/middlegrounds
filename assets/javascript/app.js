document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.parallax');
    var instances = M.Parallax.init(elems, options);
  });
$(document).ready(function () {
    var max_fields = 10;
    var wrapper = $("#test");
    var add_button = $(".btn-add");

    var x = 1;
    $(add_button).click(function (e) {
        e.preventDefault();
        if (x < max_fields) {
            x++;
            $(wrapper).prepend('<div class="input-field"><input placeholder="Email" type="email" id="email"/><a href="#" class="delete">Delete</a></div>' + '<div class="input-field"><input placeholder="Phone Number" type="tel" id="number"/><a href="#" class="delete">Delete</a></div>' ); //add input box
        }
        else {
            alert('You Reached the limits')
        }
    });

    $(wrapper).on("click", ".delete", function (e) {
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});