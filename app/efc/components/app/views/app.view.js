define(function(require) {
  var Backbone = require('backbone'),
    searchService = require('app/efc/services/search/search.service'),
    SearchComponent = require('app/efc/components/search/search-box/main.component'),
    ResultsListComponent = require('app/efc/components/results/results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  return Backbone.View.extend({
    initialize: function(options) {
      _.bindAll(this, 'didFoundRecords', 'didFailSearch');

      this.searchComponent = new SearchComponent;
      this.pagedListComponent = new ResultsListComponent;
      this.tabSwitcherComponent = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'List',
          identifier: 'list'
        }, {
          title: 'Map',
          identifier: 'map'
        }]
      });

      this.listenTo(this.searchComponent, 'search:keyword', this.onSearch);
      this.listenTo(this.pagedListComponent, 'pager:page:selected', this.onPageRequest);
    },

    onSearch: function(searchCriteria) {
      var criteria = _.extend(searchCriteria, this.pagerComponent.getState());
      this.performSearch(criteria);
      this.cachedCriteria = _.clone(criteria);
    },

    onPageRequest: function(pagerCriteria) {
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
      self.pagedListComponent.update(data);
    },

    didFailSearch: function(error) {
      console.log(error);
    },

    render: function() {
      $('body').append(this.searchComponent.render().view.el);
      $('body').append(this.tabSwitcherComponent.render().view.el);
      $('body').append(this.pagedListComponent.render().view.el);
    }
  });
})