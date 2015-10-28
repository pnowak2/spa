define(function (require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    widgetEventBus = require('../events/widgetEventBus'),
    TabView = require('./tabView'),
    TabsCollection = require('../collections/tabsCollection');

  return Backbone.View.extend({
    tagName: 'ul',
    className: 'efc-tabs',

    initialize: function () {
      this.subviews = [];
      this.collection = new TabsCollection([
        {
          title: 'Results on map',
          identifier: 'map'
        },
        {
          title: 'Results on List',
          identifier: 'list'
        }
      ]);

      this.collection.each(function (tabModel) {
        this.subviews.push(new TabView({
          model: tabModel
        }));
      }, this);

      this.listenTo(widgetEventBus, 'tab-switcher:selected', this.didSelectTab);
    },

    didSelectTab: function (tabModel) {
      this.collection.chain()
        .without(tabModel)
        .invoke('deselect');
    },

    selectTab: function (identifier) {
      this.collection
        .findWhere({ identifier: identifier })
        .select();
    },

    isTabSelected: function (identifier) {
      var tabModel = this.collection
        .findWhere({
          identifier: identifier
        });

      return tabModel && tabModel.isSelected()
    },

    render: function () {
      _.each(this.subviews, function (tabView) {
        this.$el.append(tabView.render().el);
      }, this);

      return this;
    }
  });
});