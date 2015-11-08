define(function(require) {
  var Widget = require('app/core/widget'),
    TabSwitcherView = require('./views/tabSwitcherView'),
    TabsCollection = require('./collections/tabsCollection');

  return Widget.extend({
    initialize: function(options) {
      options = options || {};

      this.view = new TabSwitcherView(options.tabDescriptors);
    }
  });
});