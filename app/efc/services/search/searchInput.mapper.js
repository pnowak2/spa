define(function(require) {
  var _ = require('underscore'),

    isAdvanced = function(input) {
      if (_.isArray(input.countries) && !_.isEmpty(input.countries)) {
        return true;
      }

      if (_.isArray(input.activities) && !_.isEmpty(input.activities)) {
        return true;
      }

      if (_.isArray(input.subactivities) && !_.isEmpty(input.subactivities)) {
        return true;
      }

      if (_.isArray(input.organisationTypes) && !_.isEmpty(input.organisationTypes)) {
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

      if (_.isArray(input.activities) && !_.isEmpty(input.activities)) {
        mapped = _.extend(mapped, {
          'FILTER-LEVEL2': input.activities.join(';')
        });
      }

      if (_.isArray(input.subactivities) && !_.isEmpty(input.subactivities)) {
        mapped = _.extend(mapped, {
          'FILTER-LEVEL3': input.subactivities.join(';')
        });
      }

      if (_.isArray(input.organisationTypes) && !_.isEmpty(input.organisationTypes)) {
        mapped = _.extend(mapped, {
          'FILTER-COORD_ORG_NAME': input.organisationTypes.join(';')
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