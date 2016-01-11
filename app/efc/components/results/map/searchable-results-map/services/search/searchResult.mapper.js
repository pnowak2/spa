define(function(require) {
  var _ = require('underscore'),

    map = function(response) {
      var total, items, response = response || {};

      total = parseInt(response['iTotalRecords'], 10) || 0;

      items = _.map(response['aaData'], function(responseItem) {
        var id = responseItem[0],
          lat = responseItem[1],
          lng = responseItem[2],
          title = responseItem[3],
          description = responseItem[4],
          activity = responseItem[5],
          coordinator = responseItem[6];

        return {
          id: id,
          lat: lat,
          lng: lng,
          title: title,
          description: description,
          activity: activity,
          coordinator: coordinator
        }
      });

      return {
        total: total,
        items: items
      }
    };

  return {
    map: map
  };
});