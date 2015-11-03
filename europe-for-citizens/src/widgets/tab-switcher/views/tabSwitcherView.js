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
      var options = _.assign({}, attrs),
        tabsConfiguration = options.configuration;

      if (!_.isArray(tabsConfiguration)) {
        throw new Error('No tabs configuration provided');
      }

      if (_.isEmpty(tabsConfiguration)) {
        throw new Error('No tabs configuration provided');
      }

      _.each(tabsConfiguration, function(tabConfig) {
        if (_.isEmpty(tabConfig.title) ||
          _.isEmpty(tabConfig.identifier)) {
          throw new Error('At least one tab descriptor is incomplete');
        }
      });

      this.subviews = [];
      this.collection = new TabsCollection([{
        title: 'Results on map',
        identifier: 'map'
      }, {
        title: 'Results on List',
        identifier: 'list'
      }]);

      this.collection.each(function(tabModel) {
        this.subviews.push(new TabView({
          model: tabModel
        }));
      }, this);

      this.listenTo(eventBus, 'tab-switcher:selected', this.didSelectTab);
    },

    didSelectTab: function(tabModel) {
      this.collection.chain()
        .without(tabModel)
        .invoke('deselect');
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
      _.each(this.subviews, function(tabView) {
        this.$el.append(tabView.render().el);
      }, this);

      return this;
    }
  });
});