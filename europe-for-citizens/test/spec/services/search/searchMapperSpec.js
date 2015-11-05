define(function(require) {
  var searchMapper = require('app/services/search/searchMapper'),

    testResponses = {
      allData: {
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
      noCountries: {
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

        it('should return object when invoked without response', function() {
          expect(searchMapper.map()).toEqual({
            total: 0,
            items: []
          });
        });

        it('should map response with one row to object', function() {
          var mapped = searchMapper.map(testResponses.allData);

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

        it('should map response without countries to object', function() {
          var mapped = searchMapper.map(testResponses.noCountries);

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