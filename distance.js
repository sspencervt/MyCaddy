let currentLocation; 
let currentCourse;
let currentHole;

function updateDistances(){
  createCurrentLocation();
  [frontPoint, centerPoint, backPoint] = currentGreenPoints(currentCourse, currentHole);
  let distanceToFront = findDistance(currentLocation, frontPoint);
  let distanceToCenter = findDistance(currentLocation, centerPoint);
  let distanceToBack = findDistance(currentLocation, backPoint);
  document.getElementById('distanceToFront').textContent = distanceToFront + ' yards';
  document.getElementById('distanceToCenter').textContent = distanceToCenter + ' yards';
  document.getElementById('distanceToBack').textContent = distanceToBack + ' yards';
}

function updateCourse(changeCourse){
  currentCourse = changeCourse;
  console.log("Changed currentCourse to :" + currentCourse)
  document.getElementById('courseDisp').textContent = currentCourse;
}

function updateHole(changeToThisHole){
  currentHole = changeToThisHole;
  console.log("Changed currentHole to :" + currentHole)
  document.getElementById('holeDisp').textContent = currentHole;

}
function currentGreenPoints(currentCourse, currentHole){
  let frontLat = courses[currentCourse].holes[currentHole].green.front[0];
  let frontLon = courses[currentCourse].holes[currentHole].green.front[1];
  let centerLat = courses[currentCourse].holes[currentHole].green.center[0];
  let centerLon = courses[currentCourse].holes[currentHole].green.center[1];
  let backLat = courses[currentCourse].holes[currentHole].green.back[0];
  let backLon = courses[currentCourse].holes[currentHole].green.back[1];
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

// let distance = findDistance(pointOne, pointTwo);

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
