define(function(require) {
  var _ = require('underscore'),

    isCallYearDefined = function(input) {
      return _.isArray(input.callYears) && !_.isEmpty(input.callYears);
    },

    isCountryDefined = function(input) {
      return _.isArray(input.countries) && !_.isEmpty(input.countries);
    },

    isActivityDefined = function(input) {
      return _.isArray(input.activities) && !_.isEmpty(input.activities);
    },

    isSubactivityDefined = function(input) {
      return _.isArray(input.subactivities) && !_.isEmpty(input.subactivities);
    },

    isOrganisationTypeDefined = function(input) {
      return _.isArray(input.organisationTypes) && !_.isEmpty(input.organisationTypes);
    },

    isAdvanced = function(input) {
      return isCallYearDefined(input) ||
        isCountryDefined(input) ||
        isActivityDefined(input) ||
        isSubactivityDefined(input) ||
        isOrganisationTypeDefined(input);
    },
	
    isMatchAll = function(input) {
      return !input.keyword &&
        !isCallYearDefined(input) &&
        !isCountryDefined(input) &&
        !isActivityDefined(input) &&
        !isSubactivityDefined(input) &&
        !isOrganisationTypeDefined(input);
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

      if (isCallYearDefined(input)) {
        mapped = _.extend(mapped, {
          'FILTER-CALL_YEAR': input.callYears.join(';')
        });
      }

      if (isCountryDefined(input)) {
        mapped = _.extend(mapped, {
          'FILTER-COVERAGE': input.countries.join(';')
        });
      }

      if (isActivityDefined(input)) {
        mapped = _.extend(mapped, {
          'FILTER-LEVEL2': input.activities.join(';')
        });
      }

      if (isSubactivityDefined(input)) {
        mapped = _.extend(mapped, {
          'FILTER-LEVEL3': input.subactivities.join(';')
        });
      }

      if (isOrganisationTypeDefined(input)) {
        mapped = _.extend(mapped, {
          'FILTER-COORD_ORG_TYPE': input.organisationTypes.join(';')
        });
      }

      if (isAdvanced(input)) {
        mapped = _.extend(mapped, {
          'searchType': 'advanced'
        });
      }
	  
      if (isMatchAll(input)) {
        mapped = _.extend(mapped, {
          'searchType': 'matchAll'
        });
      }

      return mapped;
    };

  return {
    map: map
  };
});