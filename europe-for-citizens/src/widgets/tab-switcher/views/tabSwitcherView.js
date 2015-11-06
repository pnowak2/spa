define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    TabView = require('./tabView'),
    TabsCollection = require('../collections/tabsCollection');

  return Backbone.View.extend({
    tagName: 'ul',

    className: 'efc-tabs',

    initialize: function(options) {
      this.collection = new TabsCollection(options.configuration);
    },

    didClickTab: function(identifier) {
      this.collection.selectTab(identifier);
    },

    createTabViews: function() {
      return this.collection.map(function(tabModel) {
        var tabView = new TabView({
          model: tabModel
        });

        this.listenTo(tabView, 'tab:selected', this.didClickTab);

        return tabView;
      }, this);
    },

    getTabWidthPercentage: function() {
      return 100 / this.collection.size();
    },

    render: function() {
      _.each(this.createTabViews(), function(tabView) {
        tabView.$el.css('width', this.getTabWidthPercentage() + '%');
        this.$el.append(tabView.render().el);
      }, this);

      return this;
    }
  });
});