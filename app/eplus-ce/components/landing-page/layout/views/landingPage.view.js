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
          targetSelector: '#troggleTextOrSearch',
          selected: true
        }, {
          title: 'Map',
          identifier: 'map',
          targetSelector: '.eplus-ce-map-container',
          selected: false
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