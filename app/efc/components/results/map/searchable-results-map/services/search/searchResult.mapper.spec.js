define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        total: '0',
        items: []
      },
      allDataOneRow: {
        iTotalRecords: '1',
        aaData: [
          [
            '17',
            20,
            40,
            'Project title',
            'Project description',
            'Project activity',
            'Project coordinator'
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
              lat: 20,
              lng: 40,
              title: 'Project title',
              description: 'Project description',
              activity: 'Project activity',
              coordinator: 'Project coordinator'
            }]
          })
        });
      });
    });
  });
});