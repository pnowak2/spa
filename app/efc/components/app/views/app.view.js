define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    searchService = require('app/efc/services/search/search.service');

  return Backbone.View.extend({
    initialize: function(attrs) {
      _.bindAll(this, 'didSearchSucceeded');

      this.tabSwitcherComponent = attrs.tabSwitcherComponent;
      this.pagedResultsListComponent = attrs.pagedResultsListComponent;
      this.searchComponent = attrs.searchComponent;

      this.initUI();

      this.listenTo(this.searchComponent, 'search:keyword', this.onSearchRequest);
      this.listenTo(this.pagedResultsListComponent, 'pager:page:selected', this.onPageRequest);
    },

    initUI: function() {
      this.tabSwitcherComponent.update([{
        title: 'Map',
        identifier: 'map',
        targetSelector: ''
      }, {
        title: 'List',
        identifier: 'list',
        targetSelector: '.efc-paged-results-list',
        selected: true
      }]);
    },

    onSearchRequest: function(searchCriteria) {
      var criteria = _.extend({}, searchCriteria, {
        startFromItem: 0
      });
      this.cachedCriteria = _.clone(criteria);
      searchService.search(criteria).then(this.didSearchSucceeded);
    },

    onPageRequest: function(pagerCriteria) {
      var criteria = _.extend({}, this.cachedCriteria, pagerCriteria);
      searchService.search(criteria).then(this.didSearchSucceeded);
    },

    didSearchSucceeded: function(data) {
      this.pagedResultsListComponent.update(data);
    },

    render: function() {
      $('.efc-searchbox-container').append(this.searchComponent.render().view.el);
      $('.efc-results-container').append(this.tabSwitcherComponent.render().view.el);
      $('.efc-results-container').append(this.pagedResultsListComponent.render().view.el);
    }
  });
})