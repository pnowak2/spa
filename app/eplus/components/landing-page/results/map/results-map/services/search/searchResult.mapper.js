define(function(require) {
  var _ = require('underscore'),

    mapItems = function(items) {
      return _.map(items, function(item) {
        switch (item.type) {
          case 'cluster':
            return {
              type: item.type,
              itemsCount: item.itemsCount,
              lat: item.lat,
              lng: item.lon
            };
          case 'marker':
            return {
              type: item.type,
              group: item.group,
              lat: item.lat,
              lng: item.lon,
              id: item.id,
              goodPractice: item.goodPractice,
              successStory: item.successStory,
              title: item.title,
              programme: item.programme,
              actionType: item.actionType,
              coordinator: item.coordinator,
              countries: _.chain((item.countries || '').split('|'))
                .compact()
                .value()
            };
        }
      });
    },

    map = function(response) {
      return {
        total: response.total,
        items: mapItems(response.items)
      };
    };

  return {
    map: map
  };
});