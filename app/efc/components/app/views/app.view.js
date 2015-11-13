define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    searchService = require('app/efc/services/search/search.service');

  return Backbone.View.extend({
    initialize: function(attrs) {
      _.bindAll(this, 'didFoundRecords', 'didFailSearch');

      this.tabSwitcherComponent = attrs.tabSwitcherComponent;
      this.pagedResultsListComponent = attrs.pagedResultsListComponent;
      this.searchComponent = attrs.searchComponent;

      this.listenTo(this.searchComponent, 'search:keyword', this.onSearch);
      this.listenTo(this.pagedResultsListComponent, 'pager:page:selected', this.onPageRequest);

      this.tabSwitcherComponent.update([{
        title: 'List',
        identifier: 'list',
        targetSelector: '.efc-searchbox',
        selected: true
      }, {
        title: 'Map',
        identifier: 'map',
        targetSelector: '.efc-results-list'
      }]);
    },

    onSearch: function(searchCriteria) {
      var criteria = _.extend(searchCriteria, this.pagedResultsListComponent.getPagerState());
      this.performSearch(criteria);
      this.cachedCriteria = _.clone(criteria);
    },

    onPageRequest: function(pagerCriteria) {
      console.log('page request', pagerCriteria);
      var criteria = _.extend(this.cachedCriteria, pagerCriteria);
      this.performSearch(criteria)
    },

    performSearch(criteria) {
      searchService
        .search(criteria)
        .then(this.didFoundRecords)
        .catch(this.didFailSearch);
    },

    didFoundRecords: function(data) {
      this.pagedResultsListComponent.update(data);
    },

    didFailSearch: function(error) {
      console.log(error);
    },

    render: function() {
      $('body').append(this.tabSwitcherComponent.render().view.el);
      $('body').append(this.searchComponent.render().view.el);
      $('body').append(this.pagedResultsListComponent.render().view.el);
    }
  });
})