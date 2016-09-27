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

    createBadges = function(successStory) {
      var isSuccessStory = _.isBoolean(successStory) ? successStory : (successStory === 'true');

      if(isSuccessStory) {
        return "Success Story";
      } else {
        return "";
      }
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
              coordinator = countryResponseItem[4],
              programme = findProgrammeDescriptionById(countryResponseItem[5]),
              action = findActionDescriptionById(countryResponseItem[6]),
              startDate = countryResponseItem[7],
              endDate = countryResponseItem[8],
              badges = createBadges(countryResponseItem[9]);

            return {
              id: id,
              lat: lat,
              lng: lng,
              title: title,
              badges: badges,
              programme: programme,
              action: action,
              coordinator: coordinator,
              startDate: startDate,
              endDate: endDate
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