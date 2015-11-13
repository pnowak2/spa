define(function(require) {
  var Backbone = require('backbone'),
    searchService = require('app/efc/services/search/search.service'),
    SearchComponent = require('app/efc/components/search/search-box/main.component'),
    PagedResultsListComponent = require('app/efc/components/results/paged-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  return Backbone.View.extend({
    initialize: function(options) {
      _.bindAll(this, 'didFoundRecords', 'didFailSearch');

      this.searchComponent = new SearchComponent;
      this.pagedListComponent = new PagedResultsListComponent({
        pageSize: 17,
        pageWindowSize: 15
      });
      this.tabSwitcherComponent = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'List',
          identifier: 'list',
          targetSelector: '.efc-searchbox',
          selected: true
        }, {
          title: 'Map',
          identifier: 'map',
          targetSelector: '.efc-results-list'
        }]
      });

      this.listenTo(this.searchComponent, 'search:keyword', this.onSearch);
      this.listenTo(this.pagedListComponent, 'pager:page:selected', this.onPageRequest);

      this.pagedListComponent.update({
        total: 10000,
        items: [{
          title: 'hello'
        }]
      });
    },

    onSearch: function(searchCriteria) {
      var criteria = _.extend(searchCriteria, this.pagedListComponent.getPagerState());
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
      this.pagedListComponent.update(data);
    },

    didFailSearch: function(error) {
      console.log(error);
    },

    render: function() {
      $('body').append(this.tabSwitcherComponent.render().view.el);
      $('body').append(this.searchComponent.render().view.el);
      $('body').append(this.pagedListComponent.render().view.el);
    }
  });
})