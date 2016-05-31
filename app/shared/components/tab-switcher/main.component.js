define(function(require) {
  var Component = require('app/core/component'),
    TabSwitcherView = require('./views/tabSwitcher.view'),
    TabsCollection = require('./collections/tabs.collection');

  return Component.extend({
    initialize: function(options) {
      options = options || {};

      this.view = new TabSwitcherView(options.tabDescriptors);

      this.listenTo(this.view, 'tab-switcher:tab:selected', function(identifier) {
        this.trigger('tab-switcher:tab:selected', identifier);
      });
    },

    update: function(data) {
      this.view.update(data);
    }
  });
});