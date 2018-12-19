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