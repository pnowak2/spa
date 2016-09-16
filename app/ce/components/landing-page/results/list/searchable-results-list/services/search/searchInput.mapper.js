define(function(require) {
  var _ = require('underscore'),
    constants = require('app/ce/util/constants'),

    hasSuccessStory = function(input) {
      return _.contains(input.options, constants.options.SUCCESS_STORIES);
    },

    hasOngoing = function(input) {
      return _.contains(input.options, constants.options.ONGOING);
    },

    hasCompleted = function(input) {
      return _.contains(input.options, constants.options.COMPLETED);
    },

    hasResultsOnly = function(input) {
      return _.contains(input.options, constants.options.RESULTS);
    },

    isCEProgrammeSelected = function(input) {
      return _.size(input.programmes) === 1 && _.contains(input.programmes, constants.ccm.CE);
    },

    isCulture2007ProgrammeSelected = function(input) {
      return _.size(input.programmes) === 1 && _.contains(input.programmes, constants.ccm.CULTURE_2007);
    },

    map = function(input) {
      input = input || {};
      input.options = input.options || [];
      input.programmes = input.programmes || [];
      input.subprogrammes = input.subprogrammes || [];
      input.actions = input.actions || [];
      input.activities = input.activities || [];
      input.activityYears = input.activityYears || [];
      input.fundingYears = input.fundingYears || [];
      input.countries = input.countries || [];
      input.regions = input.regions || [];
      input.organisationTypes = input.organisationTypes || [];
      input.matchAllCountries = input.matchAllCountries || false;

      var mapped = _.extend({}, {
        'iDisplayStart': input.startFromItem || 0,
        'iDisplayLength': input.pageSize || 10,
        'searchType': 'simple'
      });

      mapped = _.extend(mapped, {
        'KEYWORD': input.keyword || ''
      });

      mapped = _.extend(mapped, {
        'SUCCESS_STORY': hasSuccessStory(input) || false
      });

      if (hasOngoing(input) && hasCompleted(input)) {
        mapped = _.extend(mapped, {
          'FILTER-PROJECT_STATUS': ''
        });
      } else if (hasOngoing(input)) {
        mapped = _.extend(mapped, {
          'FILTER-PROJECT_STATUS': constants.options.ONGOING
        });
      } else if (hasCompleted(input)) {
        mapped = _.extend(mapped, {
          'FILTER-PROJECT_STATUS': constants.options.COMPLETED
        });
      } else {
        mapped = _.extend(mapped, {
          'FILTER-PROJECT_STATUS': ''
        });
      }

      mapped = _.extend(mapped, {
        'FILTER-WITH_RESULTS_ONLY': hasResultsOnly(input) || false
      });

      if (isCEProgrammeSelected(input)) {
        mapped = _.extend(mapped, {
          'FILTER-LEVEL1': _.first(input.programmes) || '',
          'FILTER-LEVEL2': _.first(input.subprogrammes) || '',
          'FILTER-LEVEL3': _.first(input.actions) || '',
          'FILTER-CATEGORY': ''
        });
      } else if (isCulture2007ProgrammeSelected(input)) {
        mapped = _.extend(mapped, {
          'FILTER-LEVEL1': '',
          'FILTER-LEVEL2': '',
          'FILTER-LEVEL3': '',
          'FILTER-CATEGORY': _.first(input.subprogrammes) || _.first(input.programmes) || ''
        });
      } else {
        mapped = _.extend(mapped, {
          'FILTER-LEVEL1': '',
          'FILTER-LEVEL2': '',
          'FILTER-LEVEL3': '',
          'FILTER-CATEGORY': ''
        });
      }

      mapped = _.extend(mapped, {
        'FILTER-TAGS': input.activities.join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-CALL_YEAR': input.fundingYears.join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-START_DATE': input.activityYears.join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-COVERAGE': input.countries.join(';')
      });

  	  mapped = _.extend(mapped, {
  		'FILTER-MATCH_ALL_COUNTRIES': input.matchAllCountries || false
  	  });

      mapped = _.extend(mapped, {
        'FILTER-REGION': input.regions.join(';')
      });

      mapped = _.extend(mapped, {
        'FILTER-TYPE': input.organisationTypes.join(';')
      });

      return mapped;
    };

  return {
    map: map
  };
});