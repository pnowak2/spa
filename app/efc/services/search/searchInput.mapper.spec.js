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
          expect(searchInputMapper.map()).toEqual({
            iDisplayStart: 0,
            iDisplayLength: 10
          });
        });

        it('should map start from page', function() {
          var input = {
            startFromPage: 30
          };

          expect(searchInputMapper.map(input)).toEqual({
            iDisplayStart: 30,
            iDisplayLength: 10
          });
        });

        it('should map page size', function() {
          var input = {
            pageSize: 19
          };

          expect(searchInputMapper.map(input)).toEqual({
            iDisplayStart: 0,
            iDisplayLength: 19
          });
        });

        it('should all paging properties', function() {
          var input = {
            startFromPage: 11,
            pageSize: 29
          };

          expect(searchInputMapper.map(input)).toEqual({
            iDisplayStart: 11,
            iDisplayLength: 29
          });
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

        it('should omit undefined input values', function() {
          var input = {
            keyword: 'foo'
          };

          expect(_.keys(searchInputMapper.map(input))).toEqual(['iDisplayStart', 'iDisplayLength', 'KEYWORD']);
        });
      });
    });
  });
});