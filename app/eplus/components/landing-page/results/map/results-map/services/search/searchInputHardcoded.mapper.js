/* 
 * Its the hardcoded version of normal search input mapper for eplus map
 * Reason is to hide all former projects and force always to make advanced search
 */
define(function(require) {
var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper'),

    map = function(input) {
      var mapped = searchInputMapper.map(input),
        level1 = mapped['FILTER-LEVEL1'];

      if(_.isEmpty(level1) || level1.indexOf('31046216') !== -1) {
        level1 = '31046216';
      }

      return _.extend({}, mapped, {
        'searchType': 'advanced',
        'FILTER-LEVEL1': level1
      });
    };

  return {
    map: map
  };
});