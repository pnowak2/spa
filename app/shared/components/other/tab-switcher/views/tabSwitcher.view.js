define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    TabView = require('./tab.view'),
    TabsCollection = require('../collections/tabs.collection');

  return Backbone.View.extend({
    tagName: 'ul',

    className: 'vlr-tabs',

    initialize: function(tabDescriptors) {
      this.collection = new TabsCollection(tabDescriptors);
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(this.collection, 'change:selected', this.didModelSelectionChange);
      this.listenTo(this.collection, 'tab:selection-request', this.didClickTab);
    },

    update: function(tabDescriptors) {
      this.collection.reset(tabDescriptors);
    },

    didClickTab: function(identifier) {
      this.collection.selectTab(identifier);
      this.trigger('tab-switcher:tab:selected', identifier);
    },

    selectTab: function(identifier) {
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
      var container = this.$el,
        tabViews = this.createTabViews();

      container.empty();

      _.each(tabViews, function(tabView) {
        container.append(tabView.render().el);
      });

      return this;
    }
  });
});