define(function(require) {
  var _ = require('underscore'),

    map = function(input) {
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

      return _.omit(input, 'bounds', 'sort');
    };

  return {
    map: map
  };
});