define(function(require) {
  var Widget = require('app/core/widget'),
    TabSwitcherView = require('./views/tabSwitcher.view'),
    TabsCollection = require('./collections/tabs.collection');

  return Widget.extend({
    initialize: function(options) {
      options = options || {};

      this.view = new TabSwitcherView(options.tabDescriptors);
    }
  });
});