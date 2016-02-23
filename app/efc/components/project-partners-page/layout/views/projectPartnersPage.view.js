define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    PartnersMapComponent = require('app/efc/components/project-partners-page/partners-map/main.component');

  return Backbone.View.extend({
    initialize: function(config) {
      this.partnersMapComponent = new PartnersMapComponent;

      this.render();
      this.partnersMapComponent.initMap();
    },

    render: function() {
      $('.efc-project-partners-container').append(this.partnersMapComponent.render().view.el);

      return this;
    }
  });
});