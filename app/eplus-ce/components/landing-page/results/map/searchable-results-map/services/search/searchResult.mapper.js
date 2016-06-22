define(function(require) {
  var _ = require('underscore'),

    map = function(response) {
      return {
        total: response.total,
        items: _.map(response.items, function(item) {
          switch (item.type) {
            case 'cluster':
              return {
                type: item.type,
                itemsCount: item.itemsCount,
                lat: item.lat,
                lng: item.lon
              }
              break;
            case 'marker':
              return {
                type: item.type,
                lat: item.lat,
                lng: item.lon,
                id: item.id,
                goodPractice: item.goodPractice,
                successStory: item.successStory,
                title: item.title,
                programme: item.programme,
                actionType: item.actionType,
                coordinator: item.coordinator,
                countries: _.chain(item.countries.split('|'))
                	.compact()
                	.map(function(countryCode) {
                		return countryCode.toLowerCase()
                	})
                  .value()
              }
              break;
          }
        })
      }
    };

  return {
    map: map
  };
});