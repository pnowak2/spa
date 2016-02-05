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

    didClickToggle: function() {
      this.getRestContainer().toggle();
    },

    getRestContainer: function() {
      return this.$el.find('.efc-flags__rest');
    },

    getToggleElement: function() {
      return this.$el.find('.efc-flags__toggle');
    },

    render: function() {
      var html = Mustache.render(tpl, this.collection.itemsData());
      this.$el.html(html);

      return this;
    }
  });
});