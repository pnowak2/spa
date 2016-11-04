define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('app/eplus/components/landing-page/results/list/searchable-results-list/services/search/searchInput.mapper'),

    map = function(input) {
      var mapped = searchInputMapper.map(input);
      input = input || {};
      input.bounds = input.bounds || {};
      input.bounds.northWest = input.bounds.northWest || {};
      input.bounds.southEast = input.bounds.southEast || {};

      input.topLeftLat = input.bounds.northWest.lat;
      input.topLeftLon = input.bounds.northWest.lng;
      input.bottomRightLat = input.bounds.southEast.lat;
      input.bottomRightLon = input.bounds.southEast.lng;

      if (input.isMaxZoom) {
        input.clustering = 'none';
      } else if (input.currentZoom <= input.minZoom + 2) {
        input.clustering = 'country';
      } else {
        input.clustering = 'boundary';
      }

      input = _.extend(input, mapped);
      return _.omit(input, 'bounds', 'sort');
    };

  return {
    map: map
  };
});