define(function(require) {
  var _ = require('underscore'),
    map = function(input) {
      input = input || {};

      var mapped = _.extend({}, {
        'iDisplayStart': input.startFromItem || 0,
        'iDisplayLength': input.pageSize || 10
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

      return mapped;
    };

  return {
    map: map
  };
});