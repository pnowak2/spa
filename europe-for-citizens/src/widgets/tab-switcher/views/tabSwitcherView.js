define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    TabView = require('./tabView'),
    TabsCollection = require('../collections/tabsCollection');

  return Backbone.View.extend({
    tagName: 'ul',

    className: 'efc-tabs',

    initialize: function(options) {
      options = options || {};

      this.collection = new TabsCollection(options.configuration);
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
        });
      });
    },

    render: function() {
      var container = this.$el;

      _.each(this.createTabViews(), function(tabView) {
        container.append(tabView.render().el);
      });

      return this;
    }
  });
});