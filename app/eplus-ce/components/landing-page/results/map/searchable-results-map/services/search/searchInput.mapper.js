define(function(require) {
  var _ = require('underscore'),
    excludedKeys = ['bounds'],

    map = function(input) {
      input = input || {};
      input.bounds = input.bounds || {};
      input.bounds.northWest = input.bounds.northWest || {};
      input.bounds.southEast = input.bounds.southEast || {};

      if (input.isMinZoom) {
        input.clustering = 'country';
      } else if (input.isMaxZoom) {
        input.clustering = 'none';
      } else {
        input.clustering = 'boundary';
      }

      input.top_left_lat = input.bounds.northWest.lat;
      input.top_left_lon = input.bounds.northWest.lng;
      input.bottom_right_lat = input.bounds.southEast.lat;
      input.bottom_right_lon = input.bounds.southEast.lng;

      return _.omit(input, excludedKeys);
    };

  return {
    map: map
  };
});