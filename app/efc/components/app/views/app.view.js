define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/efc/components/searching/search/main.component'),
    SearchableResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    countriesDataSource = require('../data/countries'),
    activitiesDataSource = require('../data/activities'),
    subactivitiesDataSource = require('../data/subactivities'),
    organisationTypesDataSource = require('../data/organisationTypes'),
    tabsDataSource = require('../data/tabs');

  return Backbone.View.extend({
    initialize: function(attrs) {
      _.bindAll(this, 'onSearchRequest');

      this.search = new SearchComponent(
        _.extend({}, {
          countries: countriesDataSource
        }, {
          activities: activitiesDataSource
        }, {
          subactivities: subactivitiesDataSource
        }, {
          organisationTypes: organisationTypesDataSource
        })
      );

      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: tabsDataSource
      });

      this.searchableList = new SearchableResultsListComponent;

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
    },

    onSearchRequest: function(searchCriteria) {
      this.searchableList.onSearchRequest(searchCriteria);
    },

    render: function() {
      $('.efc-search-container').append(this.search.render().view.el);
      $('.efc-results-container').append(this.tabSwitcher.render().view.el);
      $('.efc-results-container').append(this.searchableList.render().view.el);
    }
  });
});