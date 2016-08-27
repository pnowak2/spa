define(function(require) {
  var projectPartnersService = require('./projectPartners.service'),
    projectPartnersInputMapper = require('./projectPartnersInput.mapper'),
    projectPartnersResultMapper = require('./projectPartnersResult.mapper'),
    constants = require('app/efc/util/constants'),
    RSVP = require('rsvp'),
    $ = require('jquery'),

    testResponses = {
      find: {
        success: {
          status: 200,
          dataType: 'json',
          responseText: '{}'
        },
        error: {
          status: 500
        }
      }
    };

  describe('EfC Project Partners Service', function() {
    beforeEach(function() {
      jasmine.Ajax.install();
    });

    afterEach(function() {
      jasmine.Ajax.uninstall();
    });

    describe('api', function() {
      describe('.find()', function() {
        describe('properties', function() {
          it('should be defined', function() {
            expect(projectPartnersService.find).toEqual(jasmine.any(Function));
          });

          it('should return promise', function() {
            expect(projectPartnersService.find()).toEqual(jasmine.any(RSVP.Promise));
          });
        });

        describe('successful response', function() {
          beforeEach(function() {
            jasmine.Ajax
              .stubRequest(/.*/)
              .andReturn(testResponses.find.success);

            this.fakeCriteria = {
              projectId: '6'
            };
          });

          it('should resolve successful response', function(done) {
            var testRequest = function() {
              expect(true).toBe(true);
            };

            projectPartnersService.find(this.fakeCriteria)
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should use proper REST url and method', function(done) {
            var testRequest = function() {
              request = jasmine.Ajax.requests.mostRecent();
              expect(request.url).toContain(constants.urls.PROJECT_PARTNERS);
              expect(request.method).toBe('GET');
            };

            projectPartnersService.find(this.fakeCriteria)
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should map input criteria to data object', function(done) {
            var fakeMappedData = {
                projectId: '7'
              },
              testRequest = function() {
                expect($.ajax).toHaveBeenCalledWith(jasmine.objectContaining({
                  data: fakeMappedData
                }));
              };

            spyOn(projectPartnersInputMapper, 'map').and.returnValue(fakeMappedData);
            spyOn($, 'ajax').and.callThrough();

            projectPartnersService.find(this.fakeCriteria)
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });

          it('should map response to object', function(done) {
            var fakeMappedData = {},
              testRequest = function(data) {
                expect(projectPartnersResultMapper.map).toHaveBeenCalled();
                expect(data).toBe(fakeMappedData);
              };

            spyOn(projectPartnersResultMapper, 'map').and.returnValue(fakeMappedData);

            projectPartnersService.find(this.fakeCriteria)
              .then(testRequest)
              .catch(fail)
              .finally(done);
          });
        });

        describe('error response', function() {
          beforeEach(function() {
            jasmine.Ajax
              .stubRequest(/.*/)
              .andReturn(testResponses.find.error);

            this.fakeCriteria = {
              projectId: '6'
            };
          });

          it('should reject error response', function(done) {
            var testFailedRequest = function(errorStatus) {
              expect(errorStatus).toEqual('error');
            };

            projectPartnersService.find(this.fakeCriteria)
              .then(fail)
              .catch(testFailedRequest)
              .finally(done);
          });
        });
      });
    });
  });
});