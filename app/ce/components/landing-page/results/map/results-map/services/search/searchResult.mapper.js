define(function(require) {
  var _ = require('underscore'),
    programmesDataSource = require('app/ce/data/programmes.datasource'),
    actionsDataSource = require('app/ce/data/actions.datasource'),

    findProgrammeDescriptionById = function(id) {
      var foundItem = _.findWhere(programmesDataSource.getItems(), {
        id: id
      });

      return (foundItem || {}).title;
    },

    findActionDescriptionById = function(id) {
      var foundItem = _.chain(actionsDataSource.getItems())
        .values()
        .flatten()
        .findWhere({
          id: id
        })
        .value();

      return (foundItem || {}).title;
    },
    
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
              coordinator = countryResponseItem[6],
              programme = findProgrammeDescriptionById(countryResponseItem[7]),
              action = findActionDescriptionById(countryResponseItem[8]),
              startDate = countryResponseItem[9],
              endDate = countryResponseItem[10],
              successStory = _.isBoolean(countryResponseItem[11]) ? countryResponseItem[11] : (countryResponseItem[11] === 'true');

            return {
              id: id,
              lat: lat,
              lng: lng,
              title: title,
              coordinator: coordinator,
              programme: programme,
              action: action,
              startDate: startDate,
              endDate: endDate,
              successStory: successStory
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
    };

  return {
    map: map
  };
});