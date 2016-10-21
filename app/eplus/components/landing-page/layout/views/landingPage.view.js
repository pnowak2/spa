define(function (require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    AdvancedSearchComponent = require('app/eplus/components/landing-page/searching/advanced-search/main.component'),
    ResultsMapComponent = require('app/eplus/components/landing-page/results/map/results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/other/tab-switcher/main.component'),
    searchCriteriaBuilder = require('../util/searchCriteriaBuilder'),
    router = require('app/eplus/routers/landing-page.router');

  return Backbone.View.extend({
    initialize: function () {
      _.bindAll(this, 'didClickSearchButton');

      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent()
      });

      this.resultsMap = new ResultsMapComponent();

      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'List',
          identifier: 'list',
          targetSelector: '#troggleTextOrSearch',
          selected: true
        }, {
          title: 'Map',
          identifier: 'map',
          targetSelector: '.map-container',
          selected: false
        }]
      });

      this.render();
      this.resultsMap.initMap();
      this.listenTo(this.tabSwitcher, 'tab-switcher:tab:selected', this.didSelectTab);
      this.listenTo(router, 'route:search:keyword', this.didRouteSearchByKeyword);

      this.setupDomEvents();
    },

    setupDomEvents: function () {
      Backbone.$('#btnSearch').click(this.didClickSearchButton);
    },

    didClickSearchButton: function () {
      var criteria = searchCriteriaBuilder.getCriteria();

      this.resultsMap.onSearchRequest(criteria);
      router.navigate('keyword/' + criteria.KEYWORD);

      this.handleTabsVisibility(criteria);
    },

    handleTabsVisibility: function (criteria) {
      criteria = criteria || {};

      this.tabSwitcher.show();

      if (criteria.indexTypeShow === 'resultPublicSearch') {
        this.tabSwitcher.selectTab('list');
        this.tabSwitcher.hideTab('map');
      } else {
        this.tabSwitcher.showTab('map');
      }
    },

    didRouteSearchByKeyword: function (keyword) {
      Backbone.$('#filterSimpleSearch').val(decodeURIComponent(keyword));
      Backbone.$('#btnSearch').click();
    },

    // Hack to force map to redraw
    didSelectTab: function (identifier) {
      this.resultsMap.invalidateSize();
    },

    render: function () {
      Backbone.$('.eplus-search-container')
        .append(this.search.render().view.el);
      Backbone.$('.tab-switcher-container')
        .append(this.tabSwitcher.render().hide().view.el);
      Backbone.$('.map-container')
        .append(this.resultsMap.render().view.el);

      return this;
    }
  });
});