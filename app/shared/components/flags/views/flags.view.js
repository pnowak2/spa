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
      this.getRestContainer().toggle();
    },

    getRestContainer: function() {
      return this.$el.find('.efc-flags__rest');
    },

    getToggleContainer: function() {
      return this.$el.find('.efc-flags__toggle-container');
    },

    getToggleElement: function() {
      return this.$el.find('.efc-flags__toggle');
    },

    render: function() {
      var html = Mustache.render(tpl, this.collection.itemsData());

      this.$el.html(html);
      this.getToggleContainer().toggle(this.collection.hasRestItems());

      return this;
    }
  });
});