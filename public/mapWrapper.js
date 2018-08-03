const MapWrapper = function(containerID, coords, zoom) {
  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map = L.map(containerID).setView(coords, zoom).addLayer(osmLayer);
}

MapWrapper.prototype.moveMap = function (coords) {
  this.map.setView(coords);
};

MapWrapper.prototype.handleMapClick = function (event) {
  this.addMarker(event.latlng.lat, event.latlng.lng);
};

MapWrapper.prototype.addMarker = function(lat, lng, text){
  L.marker([lat, lng])
  .bindPopup(text)
  .addTo(this.map);
}
