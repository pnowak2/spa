define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    TabView = require('./tab.view'),
    TabsCollection = require('../collections/tabs.collection');

  return Backbone.View.extend({
    tagName: 'ul',

    className: 'efc-tabs',

    initialize: function(tabDescriptors) {
      this.collection = new TabsCollection(tabDescriptors);
      this.listenTo(this.collection, 'change:selected', this.didModelSelectionChange);
      this.listenTo(this.collection, 'tab:selection-request', this.didClickTab);
    },

    didClickTab: function(identifier) {
      this.collection.selectTab(identifier);
    },

    didModelSelectionChange: function(tabModel) {
      Backbone
        .$(tabModel.getTargetSelector())
        .toggle(tabModel.isSelected());
    },

    createTabViews: function() {
      return this.collection.map(function(tabModel) {
        return new TabView({
          model: tabModel
        })
      });
    },

    calculateTabWidth: function(tabsCount) {
      if (tabsCount === 0) {
        return '0%';
      } else {
        return (100 / tabsCount) + '%';
      }
    },

    render: function() {
      var container = this.$el,
        tabViews = this.createTabViews(),
        tabWidth = this.calculateTabWidth(tabViews.length);

      _.each(tabViews, function(tabView) {
        tabView.$el.css('width', tabWidth);
        container.append(tabView.render().el);
      });

      return this;
    }
  });
});