define(function (require) {
  var _ = require('underscore'),
    RSVP = require('rsvp');

  return {
    search: function (criteria) {
      return new RSVP.Promise(function (resolve, reject) {
        resolve({
          total: 100,
          items: [{
            id: '1',
            title: 'Sample title 1',
            description: 'Sample description 1',
            startYear: 2014,
            countries: [{
              code: 'pl',
              fullName: 'Poland'
            }, {
              code: 'be',
              fullName: 'Belgium'
            }]
          }, {
            id: '2',
            title: 'Sample title 2',
            description: 'Sample description 2',
            startYear: 2016,
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
            title: 'Etc..',
            description: 'Etc..',
            startYear: 2016,
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