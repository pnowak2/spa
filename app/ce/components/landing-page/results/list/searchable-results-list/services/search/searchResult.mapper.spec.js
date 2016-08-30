define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),
    countriesDatasource = require('app/ce/data/countries.datasource'),
    testResponses = {
      noData: {
        iTotalRecords: '0',
        aaData: []
      },
      allTwoRows: {
        iTotalRecords: '2',
        aaData: [
          [
            'workspace://123',
            'Project title',
            'Project description',
            '2015',
            'PL|BE',
            'true'
          ],
          [
            'workspace://223',
            'Project title 2',
            'Project description 2',
            '2016',
            'ES|RO',
            'false'
          ]
        ]
      },
      allTwoRowsWithWrongCountry: {
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
      }, {
        id: "ES",
        title: "Spain"
      }, {
        id: "RO",
        title: "Romania"
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

        describe('Mapping Response With Two Rows', function() {
          beforeEach(function() {
            this.mapped = searchResultMapper.map(testResponses.allTwoRows);
          });

          it('should map total property', function() {
            expect(this.mapped.total).toEqual(2);
          });

          it('should map items property', function() {
            expect(this.mapped.items).toEqual(jasmine.any(Array));
            expect(this.mapped.items.length).toEqual(2);
          });

          describe('First Row', function() {
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
                code: 'pl',
                fullName: 'Poland'
              }, {
                code: 'be',
                fullName: 'Belgium'
              }]);
            });

            it('should map item success story property', function() {
              expect(this.mapped.items[0].successStory).toEqual(true);
            });
          });

          describe('Second Row', function() {
            it('should map item id property', function() {
              expect(this.mapped.items[1].id).toEqual('workspace://223');
            });

            it('should map item title property', function() {
              expect(this.mapped.items[1].title).toEqual('Project title 2');
            });

            it('should map item description property', function() {
              expect(this.mapped.items[1].description).toEqual('Project description 2');
            });

            it('should map item start year property', function() {
              expect(this.mapped.items[1].startYear).toEqual('2016');
            });

            it('should map item countries property', function() {
              expect(this.mapped.items[1].countries).toEqual([{
                code: 'es',
                fullName: 'Spain'
              }, {
                code: 'ro',
                fullName: 'Romania'
              }]);
            });

            it('should map item success story property', function() {
              expect(this.mapped.items[1].successStory).toEqual(false);
            });
          });

        });

        describe('Mapping Response With One Row With Wrong Country', function() {
          it('should use empty full name for missing countries', function() {
            var mapped = searchResultMapper.map(testResponses.allTwoRowsWithWrongCountry);

            expect(mapped.items[0].countries).toEqual([{
              code: 'pl',
              fullName: 'Poland'
            }, {
              code: 'xy',
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