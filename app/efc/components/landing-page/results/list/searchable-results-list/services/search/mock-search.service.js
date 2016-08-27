define(function(require) {
  var _ = require('underscore'),
    RSVP = require('rsvp'),
    searchResultMapper = require('./searchResult.mapper'),
    Chance = require('chance'),
    chance = new Chance(),

    makeRandomDataRow = function() {
      return [
        chance.timestamp() + '',
        chance.sentence({
          words: 15
        }),
        chance.paragraph(),
        chance.natural({
          min: 2002,
          max: 2016
        }) + '',
        _.times(7, function() {
          return chance.country();
        }).join('|'),
        'Organisation'
      ];
    };

  return {
    search: function(criteria) {
      randomRows = _.times(10, function() {
        return makeRandomDataRow();
      });

      return new RSVP.Promise(function(resolve, reject) {
        resolve(searchResultMapper.map({
          "iTotalRecords": "1242",
          "aaData": randomRows
        }));
      });
    }
  };
});