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
        chance.paragraph({sentences: 4}),
        chance.natural({
          min: 2002,
          max: 2016
        }) + '',
        _.times(_.random(5,15), function() {
          return chance.country().toLowerCase();
        }).join('|'),
        chance.bool() + ''
      ];
    };

  return {
    search: function(criteria) {
      var randomRows = _.times(5, function() {
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