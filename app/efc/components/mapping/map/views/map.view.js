define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    Leaflet = require('leaflet'),
    MarkerCluster = require('leafletmarkercluster');

  return Backbone.View.extend({
    className: 'efc-map',

    tileUrl: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',

    initMap: function() {
      var map = this.map = Leaflet.map(this.el);
      map.setView(new Leaflet.LatLng(51.505, -0.09), 5);
      map.addLayer(new Leaflet.TileLayer(this.tileUrl, {
        minZoom: 1,
        maxZoom: 15
      }));

      var markers = this.markers = Leaflet.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      });

      map.addLayer(markers);
    },

    toLeafletMarker: function(markerComponent) {
      var markerState = markerComponent.getState(),
        marker = Leaflet.marker([
          markerState.lat,
          markerState.lng
        ]),
        markerPopup = markerComponent.render().view.el;

      marker.bindPopup(markerPopup);

      return marker;
    },

    updateMarkers: function(markerComponents) {
      this.markers.clearLayers();
      var markersArray = _.map(markerComponents, this.toLeafletMarker);
      this.markers.addLayers(markersArray);
    }
  });
});