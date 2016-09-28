define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper'),
    searchInputHardcodedMapper = require('./searchInputHardcoded.mapper');

  describe('Eplus/CE Hardcoded Search Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchInputHardcodedMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map()', function() {
        beforeEach(function() {
          spyOn(searchInputMapper, 'map').and.returnValue({
            'KEYWORD': 'foo',
            'searchType': 'bar',
            'FILTER-LEVEL1': 'dar'
          });
        });

        it('should be defined', function() {
          expect(searchInputHardcodedMapper.map).toEqual(jasmine.any(Function));
        });

        it('should pass other properties without changes', function() {
          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'KEYWORD': 'foo'
          }));
        });

        it('should override search type', function() {
          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'searchType': 'advanced'
          }));
        });

        it('should override level 1', function() {
          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'FILTER-LEVEL1': '31046216'
          }));
        });
      });
    });
  });
});