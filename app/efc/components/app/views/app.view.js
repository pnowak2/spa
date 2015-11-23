define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/efc/components/searching/search/main.component'),
    PagedResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  return Backbone.View.extend({
    initialize: function(attrs) {
      _.bindAll(this, 'onSearchRequest');

      this.searchComponent = new SearchComponent({
        countries: [{
          id: 'pl',
          title: 'Poland',
          selected: false
        }, {
          id: 'de',
          title: 'Germany',
          selected: false
        }, {
          id: 'be',
          title: 'Belgium',
          selected: false
        }, {
          id: 'lu',
          title: 'Luxembourg',
          selected: false
        }],
        activities: [{
          id: 'sr',
          title: 'Strand1: European Remembrance',
          selected: false
        }, {
          id: 'st',
          title: 'Strand2: Better communication',
          selected: false
        }],
        subactivities: [{
          id: 'tt',
          title: 'Town Twinning',
          selected: false
        }, {
          id: 'ls',
          title: 'Less troubles',
          selected: false
        }],
        organisationTypes: [{
          id: 'np',
          title: 'Non Profit',
          selected: false
        }, {
          id: 'cm',
          title: 'Commercial',
          selected: false
        }, {
          id: 'bd',
          title: 'Bare minimal',
          selected: false
        }]
      });

      this.tabSwitcherComponent = new TabSwitcherComponent;
      this.pagedResultsListComponent = new PagedResultsListComponent;

      this.listenTo(this.searchComponent, 'search:search', this.onSearchRequest);
      this.initUI();
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
      $('.efc-search-container').append(this.searchComponent.render().view.el);
      $('.efc-results-container').append(this.tabSwitcherComponent.render().view.el);
      $('.efc-results-container').append(this.pagedResultsListComponent.render().view.el);
    }
  });
})