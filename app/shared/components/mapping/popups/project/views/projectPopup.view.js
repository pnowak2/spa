define(function(require) {
  var Backbone = require('backbone'),
    ProjectPopupModel = require('../models/projectPopup.model'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/projectPopup.tpl.html');

  return Backbone.View.extend({
    className: 'efc-map-popup',

    initialize: function(options) {
      options = options || {};
      this.model = new ProjectPopupModel(options.popupData);
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);

      return this;
    }
  });
});