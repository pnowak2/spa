define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/efc/components/search/search-box/main.component'),
    PagedResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component'),
    searchService = require('app/efc/services/search/search.service');

  return Backbone.View.extend({
    initialize: function(attrs) {
      _.bindAll(this, 'onSearchRequest');

      this.searchComponent = new SearchComponent;
      this.tabSwitcherComponent = new TabSwitcherComponent;
      this.pagedResultsListComponent = new PagedResultsListComponent;
      this.multiselectComponent = new MultiselectComponent;

      this.initUI();
      this.listenTo(this.searchComponent, 'search:keyword', this.onSearchRequest);
    },

    initUI: function() {
      this.tabSwitcherComponent.update([{
        title: 'Map',
        identifier: 'map',
        targetSelector: ''
      }, {
        title: 'List',
        identifier: 'list',
        targetSelector: '.efc-searchable-results-list',
        selected: true
      }]);
    },

    onSearchRequest: function(searchCriteria) {
      this.pagedResultsListComponent.onSearchRequest(searchCriteria);
    },

    render: function() {
      $('.efc-searchbox-container').append(this.searchComponent.render().view.el);
      $('.efc-results-container').append(this.tabSwitcherComponent.render().view.el);
      $('.efc-results-container').append(this.pagedResultsListComponent.render().view.el);
      $('.efc-multiselect-container').append(this.multiselectComponent.render().view.el);
    }
  });
})