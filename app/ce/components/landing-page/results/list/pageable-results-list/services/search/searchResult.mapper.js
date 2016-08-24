define(function(require) {
  var _ = require('underscore'),
    countriesDatasource = require('app/ce/data/countries.datasource'),

    map = function(response) {
      response = response || {};

      var total = parseInt(response['iTotalRecords'], 10) || 0,
        allCountries = countriesDatasource.getItems(),
        items = [];

      items = _.map(response['aaData'], function(responseItem) {
        var id = responseItem[0],
          title = responseItem[1],
          description = responseItem[2],
          startYear = responseItem[3],
          countries = _.chain(responseItem[4].split('|'))
          .compact()
          .map(function(countryCode) {
            var fullName = (_.findWhere(allCountries, {
              id: countryCode
            }) || {}).title || ''

            return {
              code: countryCode,
              fullName: fullName
            }
          })
          .value(),
          successStory = responseItem[5] === 'true';

        return {
          id: id,
          title: title,
          description: description,
          startYear: startYear,
          countries: countries,
          successStory: successStory
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