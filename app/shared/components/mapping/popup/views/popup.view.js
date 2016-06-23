define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    $ = require('jquery'),
    _ = require('underscore'),
    tplProject = require('text!../templates/efc-projectPopup.tpl.html'),
    tplOrganisation = require('text!../templates/efc-organisationPopup.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-map-popup',

    allowedTypes: ['efc-project', 'efc-organisation'],

    initialize: function(options) {
      this.options = options || {};

      if (!_.contains(this.allowedTypes, this.options.type)) {
        throw new Error('Invalid popup type');
      }
    },

    externalizeLinks: function() {
      this.$el.find('a[rel="external"]:not([href^="http://"]):not([href^="https://"])').each(function() {
        $(this).attr('href', 'http://' + $(this).attr('href'));
      });
    },

    render: function() {
      var tpl,
        type = this.options.type,
        data = this.options.data || {};

      if (type === 'efc-organisation') {
        tpl = tplOrganisation;
      } else if (type === 'efc-project') {
        tpl = tplProject;
      }

      var html = Mustache.render(tpl, data);
      this.$el.html(html);
      this.externalizeLinks();

      return this;
    }
  });
});