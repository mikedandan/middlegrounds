database.ref().on('value', function (snapshot) {
    console.log(snapshot.val());
    var keywords = snapshot.meetPlace
});

var peopleLocation = [
    {
        lat: 33.7175,
        lng: -117.8311
    },
    {
        lat: 34.0522,
        lng: -118.2437
    },
    {
        lat: 33.6595,
        lng: -117.998
    }
];
var keywords = ["restaurant"];
var map;
var infowindow;
console.log(keywords);
function initMap() {
    //==============================================
    // This  loop that adds the bounds.extend elements to the js file based on the peopleLocations variable length
    var bounds = new google.maps.LatLngBounds();

    for (i = 0; i < peopleLocation.length; i++) {
        bounds.extend(peopleLocation[i]);
    }

    var midpoint = [bounds.getCenter().lat(), bounds.getCenter().lng()]
    var latLngMidpoint = {
        lat: midpoint[0],
        lng: midpoint[1]
    };


    map = new google.maps.Map(document.getElementById('map'), {
        center: latLngMidpoint,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: latLngMidpoint,
        radius: 1000,
        //===================================================
        //   keywords must be parsed into a single word array. This will be pulled from Firebase
        keyword: keywords
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
        console.log(results);
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });
    // var selectionLatLng = this.getPosition().toUrlValue()
    // console.log(selectionLatLng);
    google.maps.event.addListener(marker, 'click', function () {
        
            var googlelink = "https://www.google.com/maps/search/?api=1&query=" + this.getPosition().toUrlValue() + "&query_place_id=" + place.place_id + ">";

            database.ref().on('value', function (snapshot) {
                console.log(snapshot.val());
            });

            infowindow.setContent("<a class='mapLink' href=" + googlelink + place.name + "</a>" + "<hr>" + place.vicinity + "<br>" + "This place has: " + place.types.join(", "));
            infowindow.open(map, this);
        
    });
}

$(".mapLink").on("click", function (event) {

    var href = window.location.href;
    var url = new URL(href);
    var key = url.searchParams.get("key");

    database.ref(key).on("value", function (childSnapshot) {
        console.log(childSnapshot.val());
        alert("clicked");
    });
});