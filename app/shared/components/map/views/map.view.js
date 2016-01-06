define(function(require) {
  var Backbone = require('backbone'),
    Leaflet = require('leaflet'),
    MarkerCluster = require('leafletmarkercluster');

  return Backbone.View.extend({
    className: 'efc-map',

    tileUrl: 'http://europa.eu/webtools/maps/tiles/osm-ec/{z}/{x}/{y}.png',

    initialize: function() {

    },

    update: function(markers) {
      var map = Leaflet.map(this.el);
      var osm = new Leaflet.TileLayer(this.tileUrl, {
        minZoom: 1,
        maxZoom: 15
      });

      map.setView(new Leaflet.LatLng(51.505, -0.09), 13);
      map.addLayer(osm);

      var marker1 = Leaflet.marker([51.5, -0.09]);
      var marker2 = Leaflet.marker([51.52, -0.09]);
      var marker3 = Leaflet.marker([51.52, -0.11]);

      marker1.bindPopup("<b>Hello world!</b><br>I am a popup.");
      marker2.bindPopup("<b>Hello world!</b><br>I am a popup.");
      marker3.bindPopup("<b>Hello world!</b><br>I am a popup.");

      var markers = Leaflet.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      });

      markers.addLayers([marker1, marker2, marker3]);
      // markers.clearLayers();

      map.addLayer(markers);
    },

    render: function() {

      return this;
    }
  });
});