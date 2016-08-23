define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),
    countriesDatasource = require('app/ce/data/countries.datasource'),
    testResponses = {
      noData: {
        iTotalRecords: '0',
        aaData: []
      },
      allDataOneRow: {
        iTotalRecords: '1',
        aaData: [
          [
            'workspace://123',
            'Project title',
            'Project description',
            '2015',
            'PL|BE',
            'true'
          ]
        ]
      },
      allDataOneRowWithWrongCountry: {
        iTotalRecords: '1',
        aaData: [
          [
            'workspace://321',
            'Project title',
            'Project description',
            '2015',
            'PL|XY',
            'true'
          ]
        ]
      },
      noCountriesOneRow: {
        iTotalRecords: '1',
        aaData: [
          [
            'workspace://333',
            'Project title',
            'Project description',
            '2015',
            '',
            'true'
          ]
        ]
      }
    };

  describe('CE Search Result Mapper', function() {
    beforeEach(function() {
      spyOn(countriesDatasource, 'getItems').and.returnValue([{
        id: "PL",
        title: "Poland"
      }, {
        id: "BE",
        title: "Belgium"
      }]);
    });

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

        it('should not throw if called without arguments', function() {
          expect(function() {
            searchResultMapper.map();
          }).not.toThrow();
        });

        it('should return default empty object when invoked without response', function() {
          expect(searchResultMapper.map()).toEqual({
            total: 0,
            items: []
          });
        });

        describe('Mapping Response Without Rows', function() {
          it('should convert total to number if it is string', function() {
            var mapped = searchResultMapper.map(testResponses.noData);
            expect(mapped.total).toEqual(jasmine.any(Number));
          });
        });

        describe('Mapping Response With One Row', function() {
          beforeEach(function() {
            this.mapped = searchResultMapper.map(testResponses.allDataOneRow);
          });

          it('should map total property', function() {
            expect(this.mapped.total).toEqual(1);
          });

          it('should map items property', function() {
            expect(this.mapped.items).toEqual(jasmine.any(Array));
            expect(this.mapped.items.length).toEqual(1);
          });

          it('should map item id property', function() {
            expect(this.mapped.items[0].id).toEqual('workspace://123');
          });

          it('should map item title property', function() {
            expect(this.mapped.items[0].title).toEqual('Project title');
          });

          it('should map item description property', function() {
            expect(this.mapped.items[0].description).toEqual('Project description');
          });

          it('should map item start year property', function() {
            expect(this.mapped.items[0].startYear).toEqual('2015');
          });

          it('should map item countries property', function() {
            expect(this.mapped.items[0].countries).toEqual([{
              code: 'PL',
              fullName: 'Poland'
            }, {
              code: 'BE',
              fullName: 'Belgium'
            }]);
          });

          it('should map item success story property', function() {
            expect(this.mapped.items[0].successStory).toEqual(true);
          });
        });

        describe('Mapping Response With One Row With Wrong Country', function() {
          it('should use empty full name for missing countries', function() {
            var mapped = searchResultMapper.map(testResponses.allDataOneRowWithWrongCountry);

            expect(mapped.items[0].countries).toEqual([{
              code: 'PL',
              fullName: 'Poland'
            }, {
              code: 'XY',
              fullName: ''
            }]);
          });
        });

        describe('Mapping Response With One Row Without Countries', function() {
          it('should give empty countries array', function() {
            var mapped = searchResultMapper.map(testResponses.noCountriesOneRow);

            expect(mapped.items[0].countries).toEqual([]);
          });
        });
      });
    });
  });
});