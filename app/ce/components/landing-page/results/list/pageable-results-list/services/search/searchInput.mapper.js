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

    map = function(input) {
      input = input || {};

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

      if(hasOngoing(input) && hasCompleted(input)) {
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

      return mapped;
    };

  return {
    map: map
  };
});