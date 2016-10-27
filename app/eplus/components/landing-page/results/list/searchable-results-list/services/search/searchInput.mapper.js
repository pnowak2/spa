define(function (require) {
  var _ = require('underscore'),
    constants = require('app/eplus/util/constants'),

    isOngoing = function (criteria) {
      return _.contains(criteria.options, constants.options.ONGOING);
    },

    isCompleted = function (criteria) {
      return _.contains(criteria.options, constants.options.COMPLETED);
    },

    isSuccessStory = function (criteria) {
      return _.contains(criteria.options, constants.options.SUCCESS_STORIES);
    },

    hasResultsOnly = function (criteria) {
      return _.contains(criteria.options, constants.options.RESULTS);
    },

    isGoodPractice = function (criteria) {
      return _.contains(criteria.options, constants.options.GOOD_PRACTICE);
    },

    map = function (criteria) {
      criteria = criteria || {};

      if (arguments.length > 1) {
        throw new Error('Only one argument is allowed');
      }

      var mapped = _.extend({}, {
        'iDisplayStart': criteria.startFromItem || 0,
        'iDisplayLength': criteria.pageSize || 10,
        'searchType': 'advanced'
      });

      mapped = _.extend(mapped, {
        'KEYWORD': criteria.keyword || ''
      });

      if (isOngoing(criteria)) {
        mapped = _.extend(mapped, {
          'FILTER-PROJECT_STATUS': constants.options.ONGOING
        });
      } else if (isCompleted(criteria)) {
        mapped = _.extend(mapped, {
          'FILTER-PROJECT_STATUS': constants.options.COMPLETED
        });

      } else {
        mapped = _.extend(mapped, {
          'FILTER-PROJECT_STATUS': ''
        });
      }

      mapped = _.extend(mapped, {
        'SUCCESS_STORY': isSuccessStory(criteria) || false
      });

      mapped = _.extend(mapped, {
        'FILTER-WITH_RESULTS_ONLY': hasResultsOnly(criteria) || false
      });

      mapped = _.extend(mapped, {
        'GOOD_PRACTICE': isGoodPractice(criteria) || false
      });

      mapped = _.extend(mapped, {
        'FILTER-LEVEL1': (criteria.programmes || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-LEVEL2': (criteria.actions || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-LEVEL3': (criteria.actionsTypes || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-START_DATE': (criteria.activityYears || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-CALL_YEAR': (criteria.fundingYears || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-COVERAGE': (criteria.countries || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-MATCH_ALL_COUNTRIES': criteria.matchAllCountries || false
      });

      mapped = _.extend(mapped, {
        'FILTER-REGIONS': (criteria.regions || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-TYPE': (criteria.organisationTypes || []).join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-ROLE': (criteria.organisationRoles || []).join(';')
      });

      return mapped;

    };

  return {
    map: map
  };
});