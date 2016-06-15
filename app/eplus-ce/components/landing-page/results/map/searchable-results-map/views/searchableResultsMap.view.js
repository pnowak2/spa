define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    MapComponent = require('app/shared/components/mapping/map/main.component');

  return Backbone.View.extend({
  	className: 'eplus-ce-searchable-results-map',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.mapComponent = new MapComponent;
    },

    initMap: function() {
      this.mapComponent.initMap();
    },

    onSearchRequest: function(searchCriteria) {
      console.log('searchablemap', searchCriteria);
    },

    didSearchSucceed: function(data) {

    },

    didSearchFail: function(error) {
      
    },

    prepareMarkersData: function(data) {

    },

    render: function () {
    	this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});