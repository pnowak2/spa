define(function(require) {
  var searchService = require('./search.service'),
    searchInputMapper = require('./searchInput.mapper'),
    searchResultMapper = require('./searchResult.mapper'),
    constants = require('app/efc/util/constants'),
    RSVP = require('rsvp'),
    $ = require('jquery'),

    testResponses = {
      search: {
        success: {
          status: 200,
          dataType: 'json',
          responseText: JSON.stringify({
            iTotalRecords: 1,
            aaData: [
              ['17', 'Project title', 'Project description', null, '2015', 'PL|DE']
            ]
          })
        },
        error: {
          status: 500
        }
      }
    };

  describe('EfC Search Service', function() {
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
            expect(searchService.search).toEqual(jasmine.any(Function));
          });

          it('should return promise', function() {
            expect(searchService.search()).toEqual(jasmine.any(RSVP.Promise));
          });
        });

        describe('successful response', function() {
          beforeEach(function() {
            jasmine.Ajax
              .stubRequest(/.*/)
              .andReturn(testResponses.search.success);
          });

          it('should resolve successful response', function(done) {
            var testRequest = function() {
              expect(true).toBe(true);
            };

            searchService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should use proper REST url and method', function(done) {
            var testRequest = function() {
              var request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toContain(constants.urls.SEARCH_LIST);
              expect(request.method).toBe('GET');
            };

            searchService.search()
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
                }));
              };

            spyOn(searchInputMapper, 'map').and.returnValue(fakeMappedData);
            spyOn($, 'ajax').and.callThrough();

            searchService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should map response to object', function(done) {
            var fakeMappedData = {},
              testRequest = function(data) {
                expect(searchResultMapper.map).toHaveBeenCalled();
                expect(data).toBe(fakeMappedData);
              };

            spyOn(searchResultMapper, 'map').and.returnValue(fakeMappedData);

            searchService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });
        });

        describe('error response', function() {
          beforeEach(function() {
            jasmine.Ajax
              .stubRequest(/.*/)
              .andReturn(testResponses.search.error);
          });

          it('should reject error response', function(done) {
            var testFailedRequest = function(errorStatus) {
              expect(errorStatus).toEqual('error');
            };

            searchService.search()
              .then(fail)
              .catch(testFailedRequest)
              .finally(done);
          });
        });
      });
    });
  });
});