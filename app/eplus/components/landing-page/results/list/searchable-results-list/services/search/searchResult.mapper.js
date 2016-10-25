define(function(require) {
  var _ = require('underscore'),
    allCountriesDatasource = require('app/eplus/data/countries.datasource'),
    map = function(response) {
      response = response || {};

      var total = parseInt(response['iTotalRecords'], 10) || 0,
        items = [];

      items = _.map(response['aaData'], function(responseItem) {
        var id = responseItem[0],
          title = responseItem[1],
          description = responseItem[2],
          startYear = responseItem[4],
          goodPractice = responseItem[6] === 'true',
          successStory = responseItem[7] === 'true',
          allCountries = allCountriesDatasource.getItems(),
          countries = _.chain(responseItem[5].split("|"))
          .compact()
          .map(function(countryCode) {
            var countryFound = _.findWhere(allCountries, {
                id: countryCode
              }),

              countryName = ((countryFound || {}).title) || '';

            return {
              code: countryCode.toLowerCase(),
              fullName: countryName
            };
          }).value();

        return {
          id: id,
          title: title,
          description: description,
          startYear: startYear,
          countries: countries,
          goodPractice: goodPractice,
          successStory: successStory
        };

      });

      return {
        "total": total,
        "items": items
      };
    };

  return {
    map: map
  };
});