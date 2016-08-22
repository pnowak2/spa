define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper');

  describe('CE Search Input Mapper', function() {
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

        describe('Default search without any criteria typed in', function() {
          it('should map default iDisplayStart', function() {
            expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
              iDisplayStart: 0
            }));
          });

          it('should map default iDisplayLength', function() {
            expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
              iDisplayLength: 10
            }));
          });

          it('should map default searchType', function() {
            expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
              searchType: 'simple'
            }));
          });
        });

        describe('Mapping Search Criteria Properties', function() {
          describe('Keyword', function() {
            it('should map default keyword if not provided', function() {
              var input = {
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                KEYWORD: ''
              }));
            });

            it('should map keyword if provided', function() {
              var input = {
                keyword: 'foo'
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                KEYWORD: 'foo'
              }));
            });
          });
        });

        describe('Mapping Paging Properties', function() {
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
        });
      });
    });
  });
});