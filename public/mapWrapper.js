const MapWrapper = function(containerID, coords, zoom) {
  const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
  this.map = L.map(containerID).setView(coords, zoom).addLayer(osmLayer);
}

// const MapWrapper = function(element, lat, lng, zoom){
//   const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
//   this.map = L.map('main-map').setView(coords, zoom).addLayer(osmLayer);
//
//   this.map = L.map(element)
//   .addLayer(osm)
//   .setView([lat, lng], zoom);
// };

MapWrapper.prototype.handleMapClick = function (event) {
  this.addMarker(event.latlng.lat, event.latlng.lng);
};

MapWrapper.prototype.addMarker = function(lat, lng, text){
  L.marker([lat, lng])
  .bindPopup(text)
  .addTo(this.map);
}
