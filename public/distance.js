function updateDistances(currentLocation){
  currentCourse = localStorage.getItem('currentCourse');
  [frontPoint, centerPoint, backPoint] = currentGreenPoints(currentCourse, currentHole);
  console.log('currentlocationis' + currentLocation)
  let distanceToFront = findDistance(currentLocation, frontPoint);
  let distanceToCenter = findDistance(currentLocation, centerPoint);
  let distanceToBack = findDistance(currentLocation, backPoint);
  document.getElementById('distanceToFront').textContent = distanceToFront + ' yards';
  document.getElementById('distanceToCenter').textContent = distanceToCenter + ' yards';
  document.getElementById('distanceToBack').textContent = distanceToBack + ' yards';
}

function currentGreenPoints(currentCourse, thisHole){
  console.log(currentCourse)
  console.log(thisHole)
  let courseObject = JSON.parse(localStorage.getItem("courseObject"));
  let frontLat = courseObject.holes[thisHole].green.front[0];
  let frontLon = courseObject.holes[thisHole].green.front[1];
  let centerLat = courseObject.holes[thisHole].green.center[0];
  let centerLon = courseObject.holes[thisHole].green.center[1];
  let backLat = courseObject.holes[thisHole].green.back[0];
  let backLon = courseObject.holes[thisHole].green.back[1];
  let frontPoint = new Point(frontLat, frontLon);
  let centerPoint = new Point(centerLat, centerLon);
  let backPoint = new Point(backLat, backLon);
  return [frontPoint, centerPoint, backPoint];
}

class Point {
  constructor(latitude, longitude){
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

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
  
  return Math.round(y);
}

function createCurrentLocation(){
  console.log('creating your location') 
  navigator.geolocation.getCurrentPosition(function(location) {
    currentLocation = new Point(location.coords.latitude, location.coords.longitude);
    console.log(currentLocation + 'this should be your current location')
    updateDistances(currentLocation)
  });
}
