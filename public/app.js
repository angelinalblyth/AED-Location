const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
}

const requestComplete = function() {
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  defibs = JSON.parse(jsonString);
  //showTraffordCentral(defibs)
  showListOfDefibs(defibs)
  handleSelected(defibs)
}

const showListOfDefibs = function(defibs){
  console.log(defibs);

  let selectTag = document.getElementById('defibLocationDropdown');

  defibs.forEach(function(defib, index){
    let option = document.createElement('option');
    option.className = 'select-result'
    option.value = index;
    option.innerText = defib.Location;
    selectTag.appendChild(option);
  });

}
//Shows where the user is currently
//Want to expand on this to show defibs near them
const showAedsNearMe = function(mainMap){
  navigator.geolocation.getCurrentPosition(function(position){
    let coords = [position.coords.latitude, position.coords.longitude];
    mainMap.moveMap(coords);
  })
}

const handleSelected = function(defibs){
  let selectTag = document.getElementById('defibLocationDropdown');
  selectTag.addEventListener('change', function(){
    var defib = defibs[this.value];
    console.log(defib);
    showDefibDetails(defib);
  })
};



const showDefibDetails = function(defib){
  var defibDetails = document.getElementById('defibDetails');

  //Location name
  var location = document.createElement('h1');
  location.innerText = defib.Location;
  defibDetails.appendChild(location);
  //Location address line 1
  var addressLine1 = document.createElement('p');
  addressLine1.innerText = defib.Address1;
  defibDetails.appendChild(addressLine1);
  //Location address line 2
  var addressLine2 = document.createElement('p');
  addressLine2.innerText = defib.Address2;
  defibDetails.appendChild(addressLine2);
  //Location address line 3
  var addressLine3 = document.createElement('p');
  addressLine3.innerText = defib.Address3;
  defibDetails.appendChild(addressLine3);
  //Location postcode
  var postcode = document.createElement('p');
  postcode.innerText = defib.Postcode;
  defibDetails.appendChild(postcode);
  //Notes
  var notes = document.createElement('p');
  notes.innerText = defib.Notes;
  defibDetails.appendChild(notes);

  var jsonString = JSON.stringify(defib);
  localStorage.setItem('selected_defib', jsonString);
};


// find browser location
//const findMe =function(){return navigator.geolocation.getCurrentPosition(function(position){return position})}
//const findMe3 = function(){return navigator.geolocation.getCurrentPosition(function(position){console.log(position.coords)})}

var app = function(){
  const url = 'https://www.trafforddatalab.io/open_data/defibrillators/trafford_defibrillators.json';
  //const map = new MapWrapper('main-map', coords, zoom);

  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")

  const containerID = "main-map";
  const coords = [53.4576, -2.1578];
  const zoom = 14;
  const mainMap = new MapWrapper(containerID, coords, zoom);


  const showNearMeButton = document.getElementById('showNearMe');
  showNearMeButton.addEventListener('click', () => showAedsNearMe(mainMap));
  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
