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
      describe('.map', function() {
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

        it('should map only defaults and defined input properties', function() {
          var input = {
            keyword: 'foo'
          };

          expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-COVERAGE');
        });

        it('should map proper search type for advanced search', function() {
          var input = {
            countries: ['pl']
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            'searchType': 'advanced'
          }))
        });
      });
    });
  });
});