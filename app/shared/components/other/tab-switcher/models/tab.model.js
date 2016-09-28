define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      title: '',
      identifier: null,
      selected: false,
      visible: true,
      targetSelector: null
    },

    isSelected: function() {
      return this.get('selected');
    },

    isVisible: function() {
      return this.get('visible');
    },

    select: function() {
      this.set('selected', true);
    },

    deselect: function() {
      this.set('selected', false);
    },

    show: function() {
      this.set('visible', true);
    },

    hide: function() {
      this.set('visible', false);
    },

    getIdentifier: function () {
      return this.get('identifier');
    },

    getTargetSelector: function() {
      return this.get('targetSelector');
    }
  });
});