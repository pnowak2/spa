define(function(require) {
  var searchService = require('app/services/search/searchService'),
    constants = require('app/core/constants'),

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

        it('should be defined', function() {
          expect(searchService.search).toEqual(jasmine.any(Function));
        });

        xit('should call proper REST service url', function() {
          searchService.search({});

          request = jasmine.Ajax.requests.mostRecent();

          expect(request.url).toBe(constants.urls.rest.SEARCH);
          expect(request.method).toBe('GET');
        });

        xit('should call success', function(done) {
          searchService.searchByKeyword('test', function(data) {
            expect(data).toEqual({
              total: 157,
              items: [{
                id: 'id',
                title: 'title',
                description: 'description',
                year: 'year',
                countries: ['pl', 'de']
              }]
            });
            done();
          });

          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith(testResponses.search.success);
        });

        xit('should call failure', function(done) {
          searchService.searchByKeyword('test', null, function(data) {
            expect(data).toEqual('error');
            done();
          });

          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith(testResponses.search.error);
        });
      });
    });
  });
});