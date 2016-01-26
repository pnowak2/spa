define(function(require) {
  var _ = require('underscore'),

    map = function(response) {
      var total,
        itemsByCountry = [],
        response = response || {};

      total = parseInt(response['iTotalRecords'], 10) || 0;

      _.each(response['aaData'], function(oneCountryResponseItems) {
        var oneCountryItems = _.chain(oneCountryResponseItems)
          .map(function(countryResponseItem) {
            var id = countryResponseItem[0],
              lat = countryResponseItem[1],
              lng = countryResponseItem[2],
              title = countryResponseItem[3],
              description = countryResponseItem[4],
              activity = countryResponseItem[5],
              coordinator = countryResponseItem[6];

            return {
              id: id,
              lat: lat,
              lng: lng,
              title: title,
              description: description,
              activity: activity,
              coordinator: coordinator
            }
          })
          .reject(function(countryItem) {
            return countryItem.lat == '' || countryItem.lng == '';
          })
          .value();

        itemsByCountry.push(oneCountryItems)
      });

      return {
        total: total,
        itemsByCountry: itemsByCountry
      }
    };

  return {
    map: map
  };
});