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
        it('should be defined', function() {
          expect(searchInputHardcodedMapper.map).toEqual(jasmine.any(Function));
        });

        it('should pass other properties without changes', function() {
          spyOn(searchInputMapper, 'map').and.returnValue({
            'KEYWORD': 'foo'
          });

          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'KEYWORD': 'foo'
          }));
        });

        it('should always override search type to advanced', function() {
          spyOn(searchInputMapper, 'map').and.returnValue({
            'searchType': 'bar'
          });

          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'searchType': 'advanced'
          }));
        });

        it('should hardcode level1 to eplus if it is empty', function() {
          spyOn(searchInputMapper, 'map').and.returnValue({
            'FILTER-LEVEL1': ''
          });

          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'FILTER-LEVEL1': '31046216'
          }));
        });

        it('should hardcode level1 to eplus, if it is set to eplus programme + other programmes', function() {
          spyOn(searchInputMapper, 'map').and.returnValue({
            'FILTER-LEVEL1': '31046216;12345678'
          });

          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'FILTER-LEVEL1': '31046216'
          }));
        });

        it('should not hardcode level1 to eplus, if it does not contain eplus programme', function() {
          spyOn(searchInputMapper, 'map').and.returnValue({
            'FILTER-LEVEL1': '12345678'
          });

          expect(searchInputHardcodedMapper.map()).toEqual(jasmine.objectContaining({
            'FILTER-LEVEL1': '12345678'
          }));
        });
      });
    });
  });
});