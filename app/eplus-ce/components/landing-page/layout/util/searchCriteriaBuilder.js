define(function(require) {
  var _ = require('underscore'),

    getCriteria = function() {
      var searchTypeValue = $('input[name=searchType]').filter(':checked').val(),
        domain = $('#domain').val(),
        query = '';

      switch (domain) {
        case 'eplus':
          query = window.buildEducationSearchParams(searchTypeValue);
          break;
        case 'ce':
          query = window.buildCultureSearchParams(searchTypeValue);
          break;
      }

      return getQueryParametersAsObject(query);
    },

    getQueryParametersAsObject = function(str) {
      var queryStringWithoutUrl = str.replace(/.*\?/, ''),
        queryParams = queryStringWithoutUrl.split("&");

      return _.chain(queryParams)
        .compact()
        .map(function(param) {
          var data = {},
            splitted = param.split("=");

          data[splitted[0]] = splitted[1];
          return data;
        })
        .reduce(function(criteriaObject, param) {
          return _.extend(criteriaObject, param);
        }, {})
        .value();
    }

  return {
    getCriteria: getCriteria,
    getQueryParametersAsObject: getQueryParametersAsObject
  }
});