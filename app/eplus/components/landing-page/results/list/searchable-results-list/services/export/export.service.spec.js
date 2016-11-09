define(function(require) {
  var exportService = require('./export.service'),
    searchInputMapper = require('../search/searchInput.mapper'),
    constants = require('app/eplus/util/constants'),
    $ = require('jquery');

  describe('CE Export Service', function() {
    describe('api', function() {
      describe('.exportXls()', function() {
        beforeEach(function() {
          spyOn(exportService, 'getWindow').and.returnValue({
            location: ''
          });

          constants.urls.EXPORT_LIST = '/context?existing-params';
        });

        it('should be defined', function() {
          expect(exportService.exportXls).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without params', function() {
          expect(function() {
            exportService.exportXls();
          }).not.toThrow();
        });

        it('should handle lack of input criteria', function() {
          spyOn(searchInputMapper, 'map').and.returnValue({});

          exportService.exportXls({});

          expect(exportService.getWindow().location).toEqual('/context?existing-params&');
        });

        it('should got to location with criteria params url encoded', function() {
          var fakeInput = {
              keyword: 'bar',
              countries: 'pl'
            },
            fakeMappedCriteria = {
              KEYWORD: 'mappedKeyword',
              COUNTRIES: 'mappedCountries'
            };

          spyOn(searchInputMapper, 'map').and.returnValue(fakeMappedCriteria);

          exportService.exportXls(fakeInput);

          expect(exportService.getWindow().location).toEqual('/context?existing-params&KEYWORD=mappedKeyword&COUNTRIES=mappedCountries');
        });
      });

      describe('.getWindow()', function() {
        it('should be defined', function() {
          expect(exportService.getWindow).toEqual(jasmine.any(Function));
        });

        it('should return global window object', function() {
          expect(exportService.getWindow()).toBe(window);
        });
      });
    });
  });
});