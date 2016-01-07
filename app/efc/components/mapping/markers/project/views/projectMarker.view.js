define(function(require) {
  var Backbone = require('backbone'),
    ProjectMarkerModel = require('../models/projectMarker.model'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/projectMarkerPopup.tpl.html');

  return Backbone.View.extend({
    className: 'efc-marker-bubble',

    initialize: function(options) {
      options = options || {};
      this.model = new ProjectMarkerModel(options.markerData);
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);

      return this;
    }
  });
});