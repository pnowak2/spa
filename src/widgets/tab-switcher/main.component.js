define(function(require) {
  var Component = require('app/core/component'),
    TabSwitcherView = require('./views/tabSwitcher.view'),
    TabsCollection = require('./collections/tabs.collection');

  return Component.extend({
    initialize: function(options) {
      options = options || {};

      this.view = new TabSwitcherView(options.tabDescriptors);
    },

    update: function(data) {
      this.view.update(data);
    }
  });
});