define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        total: 0,
        items: []
      },
      mixed: {
        total: 12,
        items: [{
          type: 'cluster',
          itemsCount: 10,
          lat: 51,
          lon: 24
        }, {
          type: 'marker',
          group: 'pl',
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
          goodPractice: false,
          successStory: false,
          title: 'Project Title 2',
          programme: 'Project Programme 2',
          actionType: 'Project Action Type 2',
          coordinator: 'Project Coordinator 2',
          countries: undefined
        }]
      }
    };

  describe('Eplus Search Result Mapper', function() {
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

        describe('without data', function() {
          beforeEach(function() {
            this.mapped = searchResultMapper.map(testResponses.noData);
          });

          describe('common properties', function() {
            it('should have total property', function() {
              expect(this.mapped).toEqual(jasmine.objectContaining({
                total: 0
              }));
            });

            it('should have items property', function() {
              expect(this.mapped.items).toEqual(jasmine.any(Array));
              expect(this.mapped.items.length).toEqual(0);
            });
          });
        });

        describe('with data', function() {
          beforeEach(function() {
            this.mapped = searchResultMapper.map(testResponses.mixed);
          });

          describe('common properties', function() {
            it('should have total property', function() {
              expect(this.mapped).toEqual(jasmine.objectContaining({
                total: 12
              }));
            });

            it('should have items property', function() {
              expect(this.mapped.items).toEqual(jasmine.any(Array));
              expect(this.mapped.items.length).toEqual(3);
            });
          });

          describe('cluster', function() {
            it('item should have type property', function() {
              expect(this.mapped.items[0]).toEqual(jasmine.objectContaining({
                type: 'cluster'
              }));
            });

            it('item should have items count property', function() {
              expect(this.mapped.items[0]).toEqual(jasmine.objectContaining({
                itemsCount: 10
              }));
            });

            it('item should have latitude property', function() {
              expect(this.mapped.items[0]).toEqual(jasmine.objectContaining({
                lat: 51
              }));
            });

            it('item should have longitude property', function() {
              expect(this.mapped.items[0]).toEqual(jasmine.objectContaining({
                lng: 24
              }));
            });
          });

          describe('marker', function() {
            it('item should have type property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                type: 'marker'
              }));
            });

            it('item should have group property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                group: 'pl'
              }));
            });

            it('item should have latitude property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                lat: 55
              }));
            });

            it('item should have longitude property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                lng: 28
              }));
            });

            it('item should have id property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                id: '1'
              }));
            });

            it('item should have good practice property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                goodPractice: false
              }));
            });

            it('item should have success story property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                successStory: false
              }));
            });

            it('item should have title property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                title: 'Project Title 1'
              }));
            });

            it('item should have programme property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                programme: 'Project Programme 1'
              }));
            });

            it('item should have action type property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                actionType: 'Project Action Type 1'
              }));
            });

            it('item should have coordinator property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                coordinator: 'Project Coordinator 1'
              }));
            });

            it('item should have countries property', function() {
              expect(this.mapped.items[1]).toEqual(jasmine.objectContaining({
                countries: ['PL', 'DE', 'BE']
              }));
            });

            it('item should have countries property even if countries is not defined', function() {
              expect(this.mapped.items[2]).toEqual(jasmine.objectContaining({
                countries: []
              }));
            });
          });
        });
      });
    });
  });
});