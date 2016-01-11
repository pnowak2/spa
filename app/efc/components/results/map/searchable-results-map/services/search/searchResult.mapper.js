define(function(require) {
  var _ = require('underscore'),

    map = function(response) {
      var total, items, response = response || {};

    total = parseInt(response['iTotalRecords'], 10) || 0;

      items = _.map(response['aaData'], function(responseItem) {
        var id = responseItem[0],
          title = responseItem[1],
          description = responseItem[2],
          activity = responseItem[3],
          coordinator = responseItem[4];

        return {
          id: id,
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