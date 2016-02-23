define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        iTotalRecords: '0',
        aaData: []
      },
      allDataOneRow: {
        iTotalRecords: '1',
        aaData: [
          [
            '17',
            'Project title',
            'Project description',
            '2015',
            'PL|DE|BE',
            'Coordinating Organisation'
          ]
        ]
      },
      allDataTwoRows: {
        iTotalRecords: '2',
        aaData: [
          [
            '11',
            'Title 1',
            'Description 1',
            '2011',
            'PL|DE',
            'Organisation'
          ],
          [
            '16',
            'Title 2',
            'Description 2',
            '2012',
            'FR',
            'Organisation'
          ],
        ]
      },
      allDataOneRowWithWrongCountry: {
        iTotalRecords: '1',
        aaData: [
          [
            '17',
            'Project title',
            'Project description',
            '2015',
            'PL|XY',
            'Coordinating'
          ]
        ]
      },
      noCountriesOneRow: {
        iTotalRecords: '1',
        aaData: [
          [
            '17',
            'Project title',
            'Project description',
            '2015',
            '',
            'Organisation'
          ]
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
        it('should be defined', function() {
          expect(searchResultMapper.map).toEqual(jasmine.any(Function));
        });

        it('should return default empty object when invoked without response', function() {
          expect(searchResultMapper.map()).toEqual({
            total: 0,
            items: []
          });
        });

        it('should convert total to number if it is string', function() {
          var mapped = searchResultMapper.map(testResponses.noData);
          expect(mapped.total).toEqual(jasmine.any(Number));
        });

        it('should map response with one row to object', function() {
          var mapped = searchResultMapper.map(testResponses.allDataOneRow);

          expect(mapped).toEqual({
            total: 1,
            items: [{
              id: '17',
              title: 'Project title',
              description: 'Project description',
              callYear: '2015',
              countries: [{
                code: 'pl',
                fullName: 'Poland'
              }, {
                code: 'de',
                fullName: 'Germany'
              }, {
                code: 'be',
                fullName: 'Belgium'
              }]
            }]
          })
        });

        it('should map response with two rows to object', function() {
          var mapped = searchResultMapper.map(testResponses.allDataTwoRows);

          expect(mapped).toEqual({
            total: 2,
            items: [{
              id: '11',
              title: 'Title 1',
              description: 'Description 1',
              callYear: '2011',
              countries: [{
                code: 'pl',
                fullName: 'Poland'
              }, {
                code: 'de',
                fullName: 'Germany'
              }]
            }, {
              id: '16',
              title: 'Title 2',
              description: 'Description 2',
              callYear: '2012',
              countries: [{
                code: 'fr',
                fullName: 'France'
              }]
            }]
          })
        });

        it('should map response with wrong country to object', function() {
          var mapped = searchResultMapper.map(testResponses.allDataOneRowWithWrongCountry);

          expect(mapped).toEqual({
            total: 1,
            items: [{
              id: '17',
              title: 'Project title',
              description: 'Project description',
              callYear: '2015',
              countries: [{
                code: 'pl',
                fullName: 'Poland'
              }, {
                code: 'xy',
                fullName: ''
              }]
            }]
          })
        });

        it('should map response without countries to object', function() {
          var mapped = searchResultMapper.map(testResponses.noCountriesOneRow);

          expect(mapped).toEqual({
            total: 1,
            items: [{
              id: '17',
              title: 'Project title',
              description: 'Project description',
              callYear: '2015',
              countries: []
            }]
          })
        });
      });
    });
  });
});