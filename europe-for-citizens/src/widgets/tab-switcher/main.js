define(function (require) {
  var Widget = require('app/core/widget'),
    widgetEventBus = require('./events/widgetEventBus'),
    TabSwitcherView = require('./views/tabSwitcherView'),
    tabSwitcherView = new TabSwitcherView;

  return Widget.extend({
    view: tabSwitcherView,

    initialize: function () {
      this.listenTo(widgetEventBus, 'tab-switcher:selected', function (tabModel) {
        this.trigger('tab-switcher:selected', tabModel.get('identifier'));
      });
    },

    selectTab: function (identifier) {
      tabSwitcherView.selectTab(identifier);
    },

    isTabSelected: function (identifier) {
      return tabSwitcherView.isTabSelected(identifier);
    }
  });
});