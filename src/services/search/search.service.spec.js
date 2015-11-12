define(function(require) {
  var searchService = require('./search.service'),
    searchMapper = require('./search.mapper'),
    constants = require('app/util/constants'),
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
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toBe(constants.urls.rest.SEARCH);
              expect(request.method).toBe('GET');
            };

            searchService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should set proper paging attributes', function(done) {
            var testRequest = function() {
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toContain('iDisplayStart=40');
              expect(request.url).toContain('iDisplayLength=10');
            };

            searchService.search({
              startFromItem: 40,
              pageSize: 10
            }).then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should accept undefined criteria', function(done) {
            var testRequest = function() {
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toEqual(constants.urls.rest.SEARCH);
              expect(request.url).not.toContain('KEYWORD')
            };

            searchService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should set proper search criteria to request', function(done) {
            var testRequest = function() {
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toContain('KEYWORD=foo')
            };

            searchService.search({
              keyword: 'foo'
            }).then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should map response to object', function(done) {
            var fakeMappedData = {},
              testRequest = function(data) {
                expect(searchMapper.map).toHaveBeenCalled();
                expect(data).toBe(fakeMappedData);
              }

            spyOn(searchMapper, 'map').and.returnValue(fakeMappedData);

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