define(function(require) {
  var Widget = require('app/core/widget'),
    TabSwitcherView = require('./views/tabSwitcherView'),
    TabsCollection = require('./collections/tabsCollection');

  return Widget.extend({
    initialize: function(options) {
      this.view = new TabSwitcherView({
        configuration: options.configuration
      });
    },

    selectTab: function(identifier) {
      tabSwitcherView.selectTab(identifier);
    },

    isTabSelected: function(identifier) {
      return tabSwitcherView.isTabSelected(identifier);
    }
  });
});