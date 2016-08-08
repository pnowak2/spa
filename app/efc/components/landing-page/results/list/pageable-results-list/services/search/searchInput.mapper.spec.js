define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper');

  describe('Search Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchInputMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map()', function() {
        it('should be defined', function() {
          expect(searchInputMapper.map).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          expect(function() {
            searchInputMapper.map();
          }).not.toThrow();
        });

        it('should return proper defaults if called without arguments', function() {
          expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
            iDisplayStart: 0,
            iDisplayLength: 10,
            searchType: 'matchAll'
          }));
        });

        it('should return proper defaults if called with just keyword', function() {
          var input = {
            keyword: 'foo'
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            iDisplayStart: 0,
            iDisplayLength: 10,
            searchType: 'simple'
          }));
        });

        it('should map start from page', function() {
          var input = {
            startFromItem: 30
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            iDisplayStart: 30,
            iDisplayLength: 10
          }));
        });

        it('should map page size', function() {
          var input = {
            pageSize: 19
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            iDisplayStart: 0,
            iDisplayLength: 19
          }));
        });

        it('should map all paging properties', function() {
          var input = {
            startFromItem: 11,
            pageSize: 29
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            iDisplayStart: 11,
            iDisplayLength: 29
          }));
        });

        it('should map keyword', function() {
          var input = {
            keyword: 'foo'
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            KEYWORD: 'foo'
          }));
        });

        it('should map call years', function() {
          var input = {
            callYears: [2015, 2016]
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            'FILTER-CALL_YEAR': '2015;2016'
          }));
        });

        it('should not map call years if its empty array', function() {
          var input = {
            callYears: []
          };

          expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-CALL_YEAR');
        });

        it('should map countries', function() {
          var input = {
            countries: ['pl', 'de']
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            'FILTER-COVERAGE': 'pl;de'
          }));
        });

        it('should not map countries if its empty array', function() {
          var input = {
            countries: []
          };

          expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-COVERAGE');
        });

        it('should map activities', function() {
          var input = {
            activities: ['ac1', 'ac2']
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            'FILTER-LEVEL2': 'ac1;ac2'
          }));
        });

        it('should not map activities if its empty array', function() {
          var input = {
            activities: []
          };

          expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-LEVEL2');
        });

        it('should map subactivities', function() {
          var input = {
            subactivities: ['sub1', 'sub2']
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            'FILTER-LEVEL3': 'sub1;sub2'
          }));
        });

        it('should not map subactivities if its empty array', function() {
          var input = {
            subactivities: []
          };

          expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-LEVEL3');
        });

        it('should map type of organisation', function() {
          var input = {
            organisationTypes: ['org1', 'org2']
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            'FILTER-COORD_ORG_TYPE': 'org1;org2'
          }));
        });

        it('should not map type of organisation if its empty array', function() {
          var input = {
            organisationTypes: []
          };

          expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-COORD_ORG_NAME');
        });

        it('should map only defaults and defined input properties', function() {
          var input = {
              keyword: 'foo'
            },
            mapped = searchInputMapper.map(input);

          expect(_.keys(mapped)).not.toContain('FILTER-CALL_YEAR');
          expect(_.keys(mapped)).not.toContain('FILTER-COVERAGE');
          expect(_.keys(mapped)).not.toContain('FILTER-LEVEL2');
          expect(_.keys(mapped)).not.toContain('FILTER-LEVEL3');
          expect(_.keys(mapped)).not.toContain('FILTER-COORD_ORG_NAME');
        });

        it('should map proper search type for advanced search', function() {
          var inputs = [{
            callYears: [2014]
          }, {
            countries: ['pl']
          }, {
            activities: ['ac1']
          }, {
            subactivities: ['sub1']
          }, {
            organisationTypes: ['org1']
          }];

          _.each(inputs, function(input) {
            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              'searchType': 'advanced'
            }));
          });
        });
      });
    });
  });
});