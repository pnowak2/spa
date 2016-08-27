define(function(require) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    RSVP = require('rsvp'),
    app = require('app/shared/modules/app.module'),
    MapComponent = require('app/shared/components/mapping/map/simple/main.component'),
    PopupComponent = require('app/shared/components/mapping/popup/main.component');

  return Backbone.View.extend({
    className: 'vlr-partners-map',

    initialize: function(options) {
      this.options = options || {};

      this.mapComponent = new MapComponent({
        countryClusterSize: 15,
        localClusterSize: 15
      });
    },

    initMap: function() {
      this.mapComponent.initMap();
    },

    showMarkers: function(data) {
      data = data || {};

      var markers = this.prepareMarkersData(data);
      this.mapComponent.showMarkers(markers);
    },

    prepareMarkersData: function(data) {
      data = data || {};

      var total = data.total,
        coordinatorGroup = _.map([data.coordinator], function(coordinator) {
          return this.toMapMarker(coordinator, 'blue-medium');
        }, this),
        partnersGroup = _.map(data.partners, function(partner) {
          return this.toMapMarker(partner);
        }, this),
        markers = [coordinatorGroup, partnersGroup];

      return {
        total: total,
        markers: markers
      };
    },

    toMapMarker: function(markerData, markerName) {
      markerData = markerData || {};

      var popupComponent = new PopupComponent({
          type: 'efc-organisation',
          data: markerData
        }),
        popupContent = popupComponent.render().view.el;

      return {
        lat: markerData.lat,
        lng: markerData.lng,
        markerName: markerName,
        popupContent: popupContent
      };
    },

    render: function() {
      this.$el.html(this.mapComponent.render().view.el);
      return this;
    }
  });
});