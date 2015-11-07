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
      this.listenTo(this.collection, 'change', this.didModelChange);
    },

    didClickTab: function(identifier) {
      this.collection.selectTab(identifier);
    },

    didModelChange: function() {
      this.collection.each(function(tabModel) {
        Backbone.$(tabModel.getTargetSelector()).toggle(tabModel.isSelected());
      });
    },

    createTabViews: function() {
      return this.collection.map(function(tabModel) {
        var tabView = new TabView({
          model: tabModel
        });
        tabView.$el.css('width', this.calculateTabWidthPercentage());

        this.listenTo(tabView, 'tab:selected', this.didClickTab);

        return tabView;
      }, this);
    },

    calculateTabWidthPercentage: function() {
      return 100 / this.collection.size() + '%';
    },

    render: function() {
      _.each(this.createTabViews(), function(tabView) {
        this.$el.append(tabView.render().el);
      }, this);

      return this;
    }
  });
});