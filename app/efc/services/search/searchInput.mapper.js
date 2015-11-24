define(function(require) {
  var _ = require('underscore'),

    isAdvanced = function(input) {
      if (_.isArray(input.countries) && !_.isEmpty(input.countries)) {
        return true;
      }

      return false;
    },

    map = function(input) {
      input = input || {};

      var mapped = _.extend({}, {
        'iDisplayStart': input.startFromItem || 0,
        'iDisplayLength': input.pageSize || 10,
        'searchType': 'simple'
      });

      if (input.keyword) {
        mapped = _.extend(mapped, {
          'KEYWORD': input.keyword
        });
      }

      if (_.isArray(input.countries) && !_.isEmpty(input.countries)) {
        mapped = _.extend(mapped, {
          'FILTER-COVERAGE': input.countries.join(';')
        });
      }

      if (isAdvanced(input)) {
        mapped = _.extend(mapped, {
          'searchType': 'advanced'
        });
      }

      return mapped;
    };

  return {
    map: map
  };
});