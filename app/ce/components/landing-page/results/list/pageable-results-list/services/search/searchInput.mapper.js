define(function(require) {
  var _ = require('underscore'),
    constants = require('app/ce/util/constants'),

    hasSuccessStory = function(input) {
      return _.contains(input.options, constants.options.SUCCESS_STORIES);
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

      return mapped;
    };

  return {
    map: map
  };
});