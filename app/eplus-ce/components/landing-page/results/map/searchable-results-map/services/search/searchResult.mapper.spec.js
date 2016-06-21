define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        total: 0,
        items: []
      },
      clustersOnly: {
        total: 10,
        items: [{
          type: 'cluster',
          itemsCount: 10,
          lat: 51,
          lon: 24
        }]
      },
      mixed: {
        total: 10,
        items: [{
          type: 'cluster',
          itemsCount: 9,
          lat: 51,
          lon: 24
        }, {
          type: 'marker',
          lat: 54,
          lon: 27,
          id: '1',
          goodPractice: true,
          successStory: true,
          title: 'Project Title',
          programme: 'Project Programme',
          actionType: 'Project Action Type',
          coordinator: 'Project Coordinator',
          countries: 'PL|DE|BE'
        }]
      },
      markersOnly: {
        total: 4,
        items: [{
          type: 'marker',
          lat: 55,
          lon: 28,
          id: '1',
          goodPractice: false,
          successStory: false,
          title: 'Project Title 1',
          programme: 'Project Programme 1',
          actionType: 'Project Action Type 1',
          coordinator: 'Project Coordinator 1',
          countries: 'PL|DE|BE'
        }, {
          type: 'marker',
          lat: 56,
          lon: 29,
          id: '2',
          goodPractice: true,
          successStory: false,
          title: 'Project Title 2',
          programme: 'Project Programme 2',
          actionType: 'Project Action Type 2',
          coordinator: 'Project Coordinator 2',
          countries: 'PL|DE|BE'
        }, {
          type: 'marker',
          lat: 57,
          lon: 30,
          id: '3',
          goodPractice: false,
          successStory: true,
          title: 'Project Title 3',
          programme: 'Project Programme 3',
          actionType: 'Project Action Type 3',
          coordinator: 'Project Coordinator 3',
          countries: 'PL|DE|BE'
        }, {
          type: 'marker',
          lat: 58,
          lon: 31,
          id: '4',
          goodPractice: true,
          successStory: true,
          title: 'Project Title 4',
          programme: 'Project Programme 4',
          actionType: 'Project Action Type 4',
          coordinator: 'Project Coordinator 4',
          countries: 'PL|DE|BE'
        }]
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
        it('should be defined', function() {
          expect(searchResultMapper.map).toEqual(jasmine.any(Function));
        });

        describe('clustered only response', function() {
          beforeEach(function() {
            this.mapped = searchResultMapper.map(testResponses.clustersOnly);
          });

          it('should have total property', function() {
            expect(this.mapped).toEqual(jasmine.objectContaining({
              total: 10
            }));
          });

          it('should have items property', function() {
            expect(this.mapped.items).toEqual(jasmine.any(Array));
            expect(this.mapped.items.length).toEqual(1);
          });

          it('should have cluster item with proper data', function() {
            expect(this.mapped.items[0]).toEqual({
              type: 'cluster',
              itemsCount: 10,
              lat: 51,
              lng: 24
            });
          });
        });

        describe('markers only response', function() {
          beforeEach(function() {
            this.mapped = searchResultMapper.map(testResponses.markersOnly);
          });

          it('should have total property', function() {
            expect(this.mapped).toEqual(jasmine.objectContaining({
              total: 4
            }));
          });

          it('should have items property', function() {
            expect(this.mapped.items).toEqual(jasmine.any(Array));
            expect(this.mapped.items.length).toEqual(4);
          });

          it('should have marker item with proper data', function() {
            expect(this.mapped.items[0]).toEqual({
              type: 'marker',
              lat: 55,
              lng: 28,
              id: '1',
              badges: '',
              title: 'Project Title 1'
            });
          });
        });
      });
    });
  });
});