define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    $ = require('jquery'),
    _ = require('underscore'),
    tplEfCProject = require('text!../templates/efc-projectPopup.tpl.html'),
    tplEplusProject = require('text!../templates/eplus-projectPopup.tpl.html'),
    tplEfCOrganisation = require('text!../templates/efc-organisationPopup.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-map-popup',

    allowedTypes: ['efc-project', 'efc-organisation', 'eplus-project'],

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
        tpl = tplEfCOrganisation;
      } else if (type === 'efc-project') {
        tpl = tplEfCProject;
      } else if (type === 'eplus-project') {
        tpl = tplEplusProject;
      }

      var html = Mustache.render(tpl, data);
      this.$el.html(html);
      this.externalizeLinks();

      return this;
    }
  });
});