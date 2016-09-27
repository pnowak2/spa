define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app/shared/modules/app.module'),
    searchService = require('../services/search/search.service'),
    MapComponent = require('app/shared/components/mapping/map/extended/main.component'),
    PopupComponent = require('app/shared/components/mapping/popup/main.component');

  return Backbone.View.extend({
    className: 'eplus-results-map',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.mapComponent = new MapComponent();
      this.listenTo(this.mapComponent, 'map:bounds-changed', this.onMapBoundsChanged);

      this.cachedCriteria = {};
    },

    initMap: function() {
      this.mapComponent.initMap();
    },

    invalidateSize: function () {
      this.mapComponent.invalidateSize();
    },

    prepareSearchCriteria: function(criteria, mapState) {
      return _.extend({}, criteria, mapState);
    },

    onSearchRequest: function(searchCriteria) {
      var criteria = this.prepareSearchCriteria(
        searchCriteria,
        this.mapComponent.getState()
      );

      this.performSearch(criteria);

      this.cachedCriteria = criteria;
    },

    onMapBoundsChanged: function(mapState) {
      var criteria = this.prepareSearchCriteria(
        this.cachedCriteria,
        mapState
      );

      this.performSearch(criteria);
    },

    performSearch: function(criteria) {
      searchService.search(criteria)
        .then(this.didSearchSucceed)
        .catch(this.didSearchFail);
    },

    didSearchSucceed: function(data) {
      var preparedMarkersData = this.prepareMarkersData(data);
      this.mapComponent.showMarkers(preparedMarkersData);
    },

    didSearchFail: function(error) {
      app.showError(error);
    },

    prepareMarkersData: function(data) {
      data = data || {};

      var total = data.total,
        items = this.prepareItems(data.items);

      return {
        total: total,
        items: items
      };
    },

    prepareItems: function(items) {
      return _.map(items, function(item) {
        switch (item.type) {
          case 'cluster':
            return this.prepareClusterItem(item);
          case 'marker':
            return this.prepareMarkerItem(item);
        }
      }, this);
    },

    prepareClusterItem: function(item) {
      return {
        type: 'cluster',
        itemsCount: item.itemsCount,
        lat: item.lat,
        lng: item.lng
      };
    },

    prepareMarkerItem: function(item) {
      var popupComponent = new PopupComponent({
          type: 'eplus-project',
          data: {
            id: item.id,
            title: item.title,
            badges: this.prepareMarkerBadges(item),
            countries: this.prepareMarkerCountries(item),
            programme: item.programme,
            actionType: item.actionType,
            coordinator: item.coordinator
          }
        }),
        popupContent = popupComponent.render().view.el;

      return {
        type: 'marker',
        group: item.group,
        id: item.id,
        lat: item.lat,
        lng: item.lng,
        popupContent: popupContent
      };
    },

    prepareMarkerBadges: function(item) {
      if (item.goodPractice && item.successStory) {
        return 'Good Practice & Success Story';
      } else if (item.goodPractice) {
        return 'Good Practice';
      } else if (item.successStory) {
        return 'Success Story';
      } else {
        return '';
      }
    },

    prepareMarkerCountries: function(item) {
      var countries = item.countries || [],
        maxCount = 5,
        result = _.first(countries, maxCount).join(', ');

      if ((countries.length) > maxCount) {
        result += ', ...';
      }

      return result;
    },

    render: function() {
      this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});