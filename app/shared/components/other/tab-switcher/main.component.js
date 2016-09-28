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

    selectTab: function(identifier) {
      this.view.selectTab(identifier);
    },

    selectedTab: function() {
      return this.view.selectedTab();
    },

    showTab: function(identifier) {
      this.view.showTab(identifier);
    },

    hideTab: function(identifier) {
      this.view.hideTab(identifier);
    },

    update: function(data) {
      this.view.update(data);
    }
  });
});