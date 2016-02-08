define(function(require) {
  var Backbone = require('backbone'),
    FlagsCollection = require('../collections/flags.collection'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/flags.tpl.html');

  return Backbone.View.extend({
    className: 'efc-flags',

    initialize: function(flagDescriptors) {
      this.collection = new FlagsCollection(flagDescriptors);
    },

    events: {
      'click .efc-flags__toggle': 'didClickToggle'
    },

    didClickToggle: function(evt) {
      evt.preventDefault();
      this.$el.toggleClass('efc-flags--collapsed');
    },

    render: function() {
      var html = Mustache.render(tpl, this.collection.itemsData());

      this.$el.addClass('efc-flags--collapsed');
      if (!this.collection.hasRestItems()) {
        this.$el.addClass('efc-flags--short');
      }
      this.$el.html(html);

      return this;
    }
  });
});