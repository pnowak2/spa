define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        total: 0,
        items: []
      },
      cluster: {
        total: 10,
        items: [
          // country 1
          [{
            type: 'cluster',
            itemsCount: 6,
            lat: 51,
            lng: 24
          }],
          // country 2
          [{
            type: 'cluster',
            itemsCount: 3,
            lat: 53,
            lng: 26
          }, {
            type: 'marker',
            lat: 54,
            lng: 27,
            id: '1',
          }]
        ]
      },
      noCluster: {
        total: 3,
        items: [
          // country 1
          [{
            type: 'marker',
            lat: 52,
            lng: 25,
            id: '1',
          }],
          // country 2
          [{
            type: 'marker',
            lat: 53,
            lng: 26,
            id: '2',
          }, {
            type: 'marker',
            lat: 54,
            lng: 27,
            id: '3',
          }]
        ]
      }
    };

  describe('Search Result Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchResultMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map', function() {
        beforeEach(function() {

        });

        it('should be defined', function() {
          expect(searchResultMapper.map).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});