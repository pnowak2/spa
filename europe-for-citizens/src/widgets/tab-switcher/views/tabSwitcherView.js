define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    eventBus = require('../events/eventBus'),
    TabView = require('./tabView'),
    TabsCollection = require('../collections/tabsCollection');

  return Backbone.View.extend({
    tagName: 'ul',

    className: 'efc-tabs',

    initialize: function(attrs) {
      var options = _.assign({}, attrs);

      if (!_.isArray(options.configuration)) {
        throw new Error('No tabs configuration provided');
      }

      this.managedViews = [];
      this.collection = new TabsCollection(options.configuration);
      this.tabViews = this.collection.map(function(tabModel) {
        return new TabView({
          model: tabModel
        });
      }, this);

      this.listenTo(eventBus, 'tab-switcher:selected', this.didSelectTab);
    },

    addManagedView: function(identifier, view) {
      this.managedViews.push({
        identifier: identifier,
        view: view
      });
    },

    didSelectTab: function(tabModel) {
      this.collection.chain()
        .without(tabModel)
        .invoke('deselect');

      _.each(this.managedViews, function(managedView) {
        if (managedView.identifier === tabModel.get('identifier')) {
          managedView.$el.show();
        } else {
          managedView.$el.hide();
        }
      });
    },

    selectTab: function(identifier) {
      this.collection
        .findWhere({
          identifier: identifier
        })
        .select();
    },

    isTabSelected: function(identifier) {
      var tabModel = this.collection
        .findWhere({
          identifier: identifier
        });

      return tabModel && tabModel.isSelected()
    },

    render: function() {
      _.each(this.tabViews, function(tabView) {
        tabView.$el.css('width', (100 / this.collection.size()) + '%');
        this.$el.append(tabView.render().el);
      }, this);

      return this;
    }
  });
});