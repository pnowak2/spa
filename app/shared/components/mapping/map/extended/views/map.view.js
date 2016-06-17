define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    constants = require('app/shared/util/constants'),
    Mustache = require('mustache'),
    Leaflet = require('leaflet'),
    LeafletPruneCluster = require('leafletprunecluster'),
    Fullscreen = require('leafletfullscreen'),
    EasyButton = require('leafleteasybutton'),
    tpl = require('text!../templates/map.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-map',

    defaults: {

    },

    initialize: function(options) {

    },

    initMap: function () {

    },

    showMarkers: function(data) {

    },

    getMapContainerElement: function() {
      return this.$el.find('.vlr-map__map-container').get(0);
    },

    getItemsCountContainer: function() {
      return this.$el.find('.vlr-map__items-count-container');
    },

    getItemsCountElement: function() {
      return this.$el.find('.vlr-map__items-count');
    },

    render: function() {
      var html = Mustache.render(tpl);
      this.$el.append(html);

      return this;
    }
  });
});