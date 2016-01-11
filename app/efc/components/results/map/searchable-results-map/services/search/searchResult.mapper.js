define(function(require) {
  var _ = require('underscore'),

    map = function(response) {
      var total, items, response = response || {};

      total = parseInt(response['total'], 10) || 0;

      items = _.map(response['items'], function(responseItem) {
        return {
          id: responseItem.id,
          title: responseItem.title,
          description: responseItem.description,
          activity: responseItem.activity,
          coordinator: responseItem.coordinator
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