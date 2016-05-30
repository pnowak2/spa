define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'List',
          identifier: 'list',
          selected: false
        }, {
          title: 'Map',
          identifier: 'map',
          selected: true
        }]
      });

      this.render();
    },

    render: function() {
      Backbone.$('.eplus-ce-tab-switcher-container')
        .append(this.tabSwitcher.render().view.el);

      return this;
    }
  });
});