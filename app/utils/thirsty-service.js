
const earth_radius = 3958.75;

function haversine(theta) {
  return Math.sin(theta/2)*Math.sin(theta/2);
}

function haversine_formula(p1, p2) {

}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function latitude_distance(lat1, lat2) {
  lat1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  var delta_lat = Math.abs(lat2-lat1);
  var a = haversine(delta_lat);
  var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return c * earth_radius;
}

function longitude_distance(lng1, lng2) {
  lng1 *= Math.PI / 180;
  lng2 *= Math.PI / 180;
  var delta_lng = Math.abs(lng2-lng1);
  var a = haversine(delta_lng);
  var c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return c * earth_radius;
}

function manhattan_distance(p1, p2) {
  var lat_distance = latitude_distance(p1.lat, p2.lat);
  var lng_distance = longitude_distance(p1.lng, p2.lng);

  return lat_distance + lng_distance;
}

var user_loc = {lat:40.7166996, lng:-73.9588739};

var fountain_a = {lat:40.71548053, lng:-73.96393867};
var fountain_b = {lat:40.72093417, lng:-73.9549499};

console.log("distance to a");
console.log(manhattan_distance(user_loc, fountain_a));
console.log("distance to b");
console.log(manhattan_distance(user_loc, fountain_b));
