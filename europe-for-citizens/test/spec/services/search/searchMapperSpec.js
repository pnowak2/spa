define(function(require) {
  var searchMapper = require('app/services/search/searchMapper'),

    testResponses = {
      allDataOneRow: {
        iTotalRecords: 1,
        aaData: [
          [
            '17',
            'Project title',
            'Project description',
            'not important',
            '2015',
            'PL|DE|BE'
          ]
        ]
      },
      allDataTwoRows: {
        iTotalRecords: 2,
        aaData: [
          [
            '11',
            'Title 1',
            'Description 1',
            'not important',
            '2011',
            'PL|DE'
          ],
          [
            '16',
            'Title 2',
            'Description 2',
            'not important',
            '2012',
            'FR'
          ],
        ]
      },
      noCountriesOneRow: {
        iTotalRecords: 1,
        aaData: [
          [
            '17',
            'Project title',
            'Project description',
            'not important',
            '2015',
            ''
          ]
        ]
      }
    };

  describe('Search Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map', function() {
        it('should be defined', function() {
          expect(searchMapper.map).toEqual(jasmine.any(Function));
        });

        it('should return default empty object when invoked without response', function() {
          expect(searchMapper.map()).toEqual({
            total: 0,
            items: []
          });
        });

        it('should map response with one row to object', function() {
          var mapped = searchMapper.map(testResponses.allDataOneRow);

          expect(mapped).toEqual({
            total: 1,
            items: [{
              id: '17',
              title: 'Project title',
              description: 'Project description',
              year: '2015',
              countries: ['pl', 'de', 'be']
            }]
          })
        });

        it('should map response with two rows to object', function() {
          var mapped = searchMapper.map(testResponses.allDataTwoRows);

          expect(mapped).toEqual({
            total: 2,
            items: [{
              id: '11',
              title: 'Title 1',
              description: 'Description 1',
              year: '2011',
              countries: ['pl', 'de']
            }, {
              id: '16',
              title: 'Title 2',
              description: 'Description 2',
              year: '2012',
              countries: ['fr']
            }]
          })
        });

        it('should map response without countries to object', function() {
          var mapped = searchMapper.map(testResponses.noCountriesOneRow);

          expect(mapped).toEqual({
            total: 1,
            items: [{
              id: '17',
              title: 'Project title',
              description: 'Project description',
              year: '2015',
              countries: []
            }]
          })
        });
      });
    });
  });
});