define(function(require) {
  var searchService = require('./search.service'),
    constants = require('app/eplus/util/constants'),
    RSVP = require('rsvp'),
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

  describe('EPLUS Search Service', function() {
    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    describe('api', function() {
      describe('.search()', function() {

        it('should be defined', function() {
          expect(searchService.search).toEqual(jasmine.any(Function));
        });

        it('should return promise', function() {
          expect(searchService.search()).toEqual(jasmine.any(RSVP.Promise));
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

        describe('successful response', function() {
          beforeEach(function() {
            jasmine.Ajax
              .stubRequest(/.*/)
              .andReturn(testResponses.search.success);
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

          it('should resolve successful response', function(done) {
            var testRequest = function() {
              expect(true).toBe(true);
            };

            searchService.search()
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

        });
      });
    });
  });

});