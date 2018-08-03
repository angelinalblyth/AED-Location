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

var app = function(){
  const url = 'https://www.trafforddatalab.io/open_data/defibrillators/trafford_defibrillators.json';


  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")

  const containerID = "main-map";
  const coords = [53.4576, -2.1578];
  const zoom = 10;
  const mainMap = new MapWrapper(containerID, coords, zoom);

  makeRequest(url, requestComplete);
}

window.addEventListener('load', app);
