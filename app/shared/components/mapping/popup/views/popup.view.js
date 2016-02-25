define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    _ = require('underscore'),
    tplProject = require('text!../templates/projectPopup.tpl.html'),
    tplOrganisation = require('text!../templates/organisationPopup.tpl.html');

  return Backbone.View.extend({
    className: 'efc-map-popup',

    allowedTypes: ['project', 'organisation'],

    initialize: function(options) {
      this.options = options || {};

      if (!_.contains(this.allowedTypes, this.options.type)) {
        throw new Error('Invalid popup type');
      }
    },

    render: function() {
      var tpl,
        type = this.options.type,
        data = this.options.data;

      if (type == 'organisation') {
        tpl = tplOrganisation;
      } else if (type == 'project') {
        tpl = tplProject;
      }

      var html = Mustache.render(tpl, data);
      this.$el.html(html);

      return this;
    }
  });
});