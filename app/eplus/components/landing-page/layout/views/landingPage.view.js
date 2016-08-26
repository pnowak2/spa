define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    ResultsMapComponent = require('app/eplus/components/landing-page/results/map/results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/other/tab-switcher/main.component'),
    searchCriteriaBuilder = require('../util/searchCriteriaBuilder'),
    router = require('app/eplus/routers/landing-page.router');

  return Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'didClickSearchButton');

      this.resultsMap = new ResultsMapComponent;
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

    setupDomEvents: function() {
      Backbone.$('#btnSearch').click(this.didClickSearchButton);
    },

    didClickSearchButton: function() {
      var criteria = searchCriteriaBuilder.getCriteria();

      this.resultsMap.onSearchRequest(criteria);
      router.navigate('keyword/' + criteria.KEYWORD);
    },

    didRouteSearchByKeyword: function(keyword) {
      Backbone.$('#filterSimpleSearch').val(decodeURIComponent(keyword));
      Backbone.$('#btnSearch').click();
    },

    // Hack to force map to redraw
    didSelectTab: function(identifier) {
      if (document.createEvent) {
        // W3C
        var ev = document.createEvent('Event');
        ev.initEvent('resize', true, true);
        window.dispatchEvent(ev);
      } else {
        // IE
        document.fireEvent('onresize');
      }
    },

    render: function() {
      Backbone.$('.tab-switcher-container')
        .append(this.tabSwitcher.render().view.el);
      Backbone.$('.map-container')
        .append(this.resultsMap.render().view.el);

      return this;
    }
  });
});