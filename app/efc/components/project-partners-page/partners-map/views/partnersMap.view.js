define(function(require) {
  var Backbone = require('backbone'),
    MapComponent = require('app/shared/components/mapping/map/main.component');

  return Backbone.View.extend({
    className: 'efc-partners-map',

    initialize: function() {
      this.mapComponent = new MapComponent;
    },

    initMap: function() {
      this.mapComponent.initMap();
    },

    render: function() {
      this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});