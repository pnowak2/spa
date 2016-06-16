define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchableResultsMapComponent = require('app/eplus-ce/components/landing-page/results/map/searchable-results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    searchCriteriaBuilder = require('../util/searchCriteriaBuilder');

  return Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'didClickSearchButton');

      this.searchableResultsMap = new SearchableResultsMapComponent;
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'List',
          identifier: 'list',
          targetSelector: '#troggleTextOrSearch',
          selected: true
        }, {
          title: 'Map',
          identifier: 'map',
          targetSelector: '.eplus-ce-map-container',
          selected: false
        }]
      });

      this.render();
      this.searchableResultsMap.initMap();
      this.listenTo(this.tabSwitcher, 'tab-switcher:tab:selected', this.didSelectTab);
      this.setupDomEvents();
    },

    setupDomEvents: function() {
      Backbone.$('#btnSearch').click(this.didClickSearchButton);
    },

    didClickSearchButton: function() {
      this.searchableResultsMap.onSearchRequest(searchCriteriaBuilder.getCriteria());
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
      Backbone.$('.eplus-ce-tab-switcher-container')
        .append(this.tabSwitcher.render().view.el);
      Backbone.$('.eplus-ce-map-container')
        .append(this.searchableResultsMap.render().view.el);

      return this;
    }
  });
});