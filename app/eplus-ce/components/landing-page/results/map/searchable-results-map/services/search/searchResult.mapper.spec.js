define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        total: 0,
        items: []
      },
      mixed: {
        total: 11,
        items: [{
          type: 'cluster',
          itemsCount: 10,
          lat: 51,
          lon: 24
        }, {
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
              expect(this.mapped.items.length).toEqual(1);
            });

            it('should have items property with subitems', function() {
              expect(this.mapped.items[0]).toEqual(jasmine.any(Array));
              expect(this.mapped.items[0].length).toEqual(0);
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
                total: 11
              }));
            });

            it('should have items property', function() {
              expect(this.mapped.items).toEqual(jasmine.any(Array));
              expect(this.mapped.items.length).toEqual(1);
            });

            it('should have items property with subitems', function() {
              expect(this.mapped.items[0]).toEqual(jasmine.any(Array));
              expect(this.mapped.items[0].length).toEqual(2);
            });
          });

          describe('cluster', function() {
            it('item should have type property', function() {
              expect(this.mapped.items[0][0]).toEqual(jasmine.objectContaining({
                type: 'cluster'
              }));
            });

            it('item should have items count property', function() {
              expect(this.mapped.items[0][0]).toEqual(jasmine.objectContaining({
                itemsCount: 10
              }));
            });

            it('item should have latitude property', function() {
              expect(this.mapped.items[0][0]).toEqual(jasmine.objectContaining({
                lat: 51
              }));
            });

            it('item should have longitude property', function() {
              expect(this.mapped.items[0][0]).toEqual(jasmine.objectContaining({
                lng: 24
              }));
            });
          });

          describe('marker', function() {
            it('item should have type property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                type: 'marker'
              }));
            });

            it('item should have latitude property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                lat: 55
              }));
            });

            it('item should have longitude property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                lng: 28
              }));
            });

            it('item should have id property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                id: '1'
              }));
            });

            it('item should have good practice property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                goodPractice: false
              }));
            });

            it('item should have success story property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                successStory: false
              }));
            });

            it('item should have title property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                title: 'Project Title 1'
              }));
            });

            it('item should have programme property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                programme: 'Project Programme 1'
              }));
            });

            it('item should have action type property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                actionType: 'Project Action Type 1'
              }));
            });

            it('item should have coordinator property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                coordinator: 'Project Coordinator 1'
              }));
            });

            it('item should have countries property', function() {
              expect(this.mapped.items[0][1]).toEqual(jasmine.objectContaining({
                countries: ['pl', 'de', 'be']
              }));
            });
          });
        });
      });
    });
  });
});