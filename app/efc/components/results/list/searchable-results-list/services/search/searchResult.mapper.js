define(function(require) {
  var _ = require('underscore'),
    countriesDatasource = require('app/efc/data/countries.datasource'),

    map = function(response) {
      var response = response || {},
        total = parseInt(response['iTotalRecords'], 10) || 0,
        allCountries = countriesDatasource.getItems(),
        items;

      items = _.map(response['aaData'], function(responseItem) {
        var id = responseItem[0],
          title = responseItem[1],
          description = responseItem[2],
          startYear = responseItem[3],
          countries = _.chain(responseItem[4].split('|'))
          .compact()
          .map(function(country) {
            var code = country.toLowerCase(),
              fullName = (_.findWhere(allCountries, {
                id: country
              }) || {}).title || ''

            return {
              code: code,
              fullName: fullName
            }
          })
          .value();

        return {
          id: id,
          title: title,
          description: description,
          startYear: startYear,
          countries: countries
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