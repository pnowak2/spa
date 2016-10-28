define(function (require) {
  var _ = require('underscore'),
    RSVP = require('rsvp'),
    Chance = require('chance'),
    chance = new Chance();

  return {
    search: function (criteria) {
      return new RSVP.Promise(function (resolve, reject) {
        resolve({
          total: 100,
          items: [{
            id: '1',
            title: chance.sentence(),
            description: 'Sample description 1',
            callYear: chance.year(),
            countries: [{
              code: 'pl',
              fullName: 'Poland'
            }, {
              code: 'be',
              fullName: 'Belgium'
            }]
          }, {
            id: '2',
            title: chance.sentence(),
            description: 'Sample description 2',
            callYear: chance.year(),
            countries: [{
              code: 'ro',
              fullName: 'Romania'
            }, {
              code: 'es',
              fullName: 'Spain'
            }]
          },
          {
            id: '..',
            title: chance.sentence(),
            description: 'Etc..',
            callYear: chance.year(),
            countries: [{
              code: 'uk',
              fullName: 'United Kingdom'
            }]
          }]
        });
      });
    }
  };
});