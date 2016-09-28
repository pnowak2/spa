define(function(require) {
  var projectPartnersResultMapper = require('./projectPartnersResult.mapper'),

    testResponses = {
      noData: {
        total: 0,
        coordinator: {},
        partners: []
      },
      twoPartners: {
        total: 3,
        coordinator: {
          name: 'Coordinator name',
          type: 'Coordinator type',
          role: 'Coordinator role',
          address: 'Coordinator address',
          website: 'Coordinator website',
          lat: '2',
          lng: '4',
          notAccurate: true
        },
        partners: [{
          name: 'Partner 1 name',
          type: 'Partner 1 type',
          role: 'Partner 1 role',
          address: 'Partner 1 address',
          website: 'Partner 1 website',
          lat: '3',
          lng: '5',
          notAccurate: false
        }, {
          name: 'Partner 2 name',
          type: 'Partner 2 type',
          role: 'Partner 2 role',
          address: 'Partner 2 address',
          website: 'Partner 2 website',
          lat: '4',
          lng: '6',
          notAccurate: true
        }]
      }
    };

  describe('EfC Project Partners Result Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(projectPartnersResultMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map', function() {
        it('should be defined', function() {
          expect(projectPartnersResultMapper.map).toEqual(jasmine.any(Function));
        });

        it('should return default empty object when invoked without response', function() {
          expect(projectPartnersResultMapper.map()).toEqual({
            total: 0,
            coordinator: {},
            partners: []
          });
        });

        it('should map response with coordinator and two partners', function() {
          var mapped = projectPartnersResultMapper.map(testResponses.twoPartners);

          expect(mapped).toEqual({
            total: 3,
            coordinator: {
              name: 'Coordinator name',
              type: 'Coordinator type',
              role: 'Coordinator role',
              address: 'Coordinator address',
              website: 'Coordinator website',
              lat: '2',
              lng: '4',
              notAccurate: true
            },
            partners: [{
              name: 'Partner 1 name',
              type: 'Partner 1 type',
              role: 'Partner 1 role',
              address: 'Partner 1 address',
              website: 'Partner 1 website',
              lat: '3',
              lng: '5',
              notAccurate: false
            }, {
              name: 'Partner 2 name',
              type: 'Partner 2 type',
              role: 'Partner 2 role',
              address: 'Partner 2 address',
              website: 'Partner 2 website',
              lat: '4',
              lng: '6',
              notAccurate: true
            }]
          });
        });
      });
    });
  });
});