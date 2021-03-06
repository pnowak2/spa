define(function(require) {
  var map = function(response) {
    var total, items, response = response || {};

    total = parseInt(response['iTotalRecords'], 10) || 0;

    items = _.map(response['aaData'], function(responseItem) {
      var id = responseItem[0],
        title = responseItem[1],
        description = responseItem[2],
        startYear = responseItem[4],
        countries = _.chain(responseItem[5].split('|'))
        .map(function(country) {
          return country.toLowerCase();
        })
        .compact()
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
  }

  return {
    map: map
  }
});