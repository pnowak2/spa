define(function(require) {
  var _ = require('underscore'),
    $ = require('jquery'),

    getQueryParametersAsObject = function(str) {
      if (!str.match(/(=)/g)) {
        return {};
      }

      var queryStringWithoutUrl = str.replace(/.*\?/, ''),
        queryParams = queryStringWithoutUrl.split("&");

      return _.chain(queryParams)
        .compact()
        .map(function(param) {
          var data = {},
            splitted = param.split("=");

          data[splitted[0]] = window.decodeURIComponent(splitted[1]);
          return data;
        })
        .reduce(function(criteriaObject, param) {
          return _.extend(criteriaObject, param);
        }, {})
        .value();
    },

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
    };

  return {
    getCriteria: getCriteria,
    getQueryParametersAsObject: getQueryParametersAsObject
  };
});