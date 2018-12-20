console.log("hey")
var peopleLocation = [];

// Initialize and add the map
// function initMap() {

//     // The location of currentPos
//     var currentPos = { lat: 33.6405, lng: -117.8443 };
//     // The map, centered at currentPos
//     var map = new google.maps.Map(
//         document.getElementById('map'), { zoom: 10, center: currentPos });
//     // The marker, positioned at currentPos
//     // var marker = new google.maps.Marker({position: new google.maps.LatLng(circle.getCenter().lat(), circle.getBounds().getNorthEast().lng()), map: map});
// }

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
console.log("mid point:", bounds.getCenter().lat(), bounds.getCenter().lng());
var midpoint = [bounds.getCenter().lat(), bounds.getCenter().lng()]
console.log("Mid point: " + midpoint);