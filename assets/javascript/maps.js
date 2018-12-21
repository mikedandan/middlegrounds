database.ref().on('value', function(snapshot){
console.log(snapshot.val());
keywords = snapshot.peopleLocation
});

var peopleLocation = [
    {
        lat: 33.7175,
        lng: -117.8311
    },
    {
        lat: 34.0522,
        lng: -118.2437
    }];
var keywords = ["restaurant"];
var map;
var infowindow;

function initMap() {
    //==============================================
    // This needs to be a for loop that adds the bounds.extend elements to the js file based on the peopleLocations variable length
    var bounds = new google.maps.LatLngBounds();
    // bounds.extend({
    //     lat: 40.712776,
    //     lng: -73.935242
    // })
    // bounds.extend({
    //     lat: 42.3601,
    //     lng: -71.0589
    // })
    // bounds.extend({
    //     lat: 38.5976,
    //     lng: -80.4549
    // })
    // for loop for the bounds.extent
    for (i =0;i < peopleLocation.length;i++){
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
        infowindow.setContent("<a href=" + "https://www.google.com/maps/search/?api=1&query=" + this.getPosition().toUrlValue() + "&query_place_id=" + place.place_id + ">" + place.name + "</a>" + "<hr>" + place.vicinity + "<br>" + "This place has: " + place.types.join(", "));
        infowindow.open(map, this);
    });
}