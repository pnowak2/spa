define(function(require) {
  var exportService = require('./export.service'),
    searchInputMapper = require('../search/searchInput.mapper'),
    constants = require('app/efc/util/constants'),
    RSVP = require('rsvp'),
    $ = require('jquery'),

    testResponses = {
      export: {
        success: {
          status: 200,
          responseText: "{}"
        },
        error: {
          status: 500
        }
      }
    };

  describe('Search Service', function() {
    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    describe('api', function() {
      describe('.search()', function() {
        describe('properties', function() {
          it('should be defined', function() {
            expect(exportService.search).toEqual(jasmine.any(Function));
          });

          it('should return promise', function() {
            expect(exportService.search()).toEqual(jasmine.any(RSVP.Promise));
          });
        });

        describe('successful response', function() {
          beforeEach(function() {
            jasmine.Ajax
              .stubRequest(/.*/)
              .andReturn(testResponses.export.success);
          });

          it('should resolve successful response', function(done) {
            var testRequest = function() {
              expect(true).toBe(true);
            };

            exportService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should use proper REST url and method', function(done) {
            var testRequest = function() {
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toContain(constants.urls.EXPORT_LIST);
              expect(request.method).toBe('GET');
            };

            exportService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should map input criteria to data object', function(done) {
            var fakeMappedData = {
                foo: 'bar'
              },
              testRequest = function() {
                expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
                  data: fakeMappedData
                }))
              };

            spyOn(searchInputMapper, 'map').and.returnValue(fakeMappedData);
            spyOn($, 'ajax').and.callThrough();

            exportService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });
        });

        describe('error response', function() {
          beforeEach(function() {
            jasmine.Ajax
              .stubRequest(/.*/)
              .andReturn(testResponses.export.error);
          });

          it('should reject error response', function(done) {
            var testFailedRequest = function(errorStatus) {
              expect(errorStatus).toEqual('error');
            };

            exportService.search()
              .then(fail)
              .catch(testFailedRequest)
              .finally(done);
          });
        });
      });
    });
  });
});