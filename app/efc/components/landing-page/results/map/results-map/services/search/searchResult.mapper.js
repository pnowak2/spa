define(function(require) {
  var _ = require('underscore'),
    activitiesDataSource = require('app/efc/data/activities.datasource'),

    map = function(response) {
      response = response || {};

      var total = parseInt(response['iTotalRecords'], 10) || 0,
        itemsByCountry = [];

      _.each(response['aaData'], function(oneCountryResponseItems) {
        var oneCountryItems = _.chain(oneCountryResponseItems)
          .map(function(countryResponseItem) {
            var id = countryResponseItem[0],
              lat = countryResponseItem[1],
              lng = countryResponseItem[2],
              title = countryResponseItem[3],
              description = countryResponseItem[4],
              activity = findActivityDescription(countryResponseItem[5]),
              coordinator = countryResponseItem[6];

            return {
              id: id,
              lat: lat,
              lng: lng,
              title: title,
              description: description,
              activity: activity,
              coordinator: coordinator
            };
          })
          .reject(function(countryItem) {
            return countryItem.lat === '' || countryItem.lng === '';
          })
          .value();

        itemsByCountry.push(oneCountryItems);
      }, this);

      return {
        total: total,
        markers: itemsByCountry
      };
    },

    findActivityDescription = function(activityCode) {
      var foundItem = _.findWhere(activitiesDataSource.getItems(), {
        id: activityCode
      });

      return (foundItem || {}).title;
    };

  return {
    map: map
  };
});