let currentLocation;

class Point {
  constructor(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

let distance = findDistance(pointOne, pointTwo);

function findDistance(pointOne, pointTwo){
  var R = 6378137; // metres - was 6371e3
  var φ1 = pointOne.latitude*Math.PI/180 
  var φ2 = pointTwo.latitude*Math.PI/180 
  var Δφ = (pointTwo.latitude-pointOne.latitude)*Math.PI/180 
  var Δλ = (pointTwo.longitude-pointOne.longitude)*Math.PI/180 

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  var y = d *1.09361
  
  return y;
}

function createCurrentLocation(){
navigator.geolocation.getCurrentPosition(function(location) {
    currentLocation = new Point(location.coords.latitude, location.coords.longitude);
  });
}