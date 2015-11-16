define(function(require) {
  var Component = require('app/core/component'),
    PagedResultsListComponent = require('./main.component'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component'),
    PagedResultsListView = require('./views/pagedResultsList.view');

  describe('Paged Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PagedResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        it('should be defined', function() {
          expect(PagedResultsListComponent.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(PagedResultsListView.prototype, 'onSearchRequest');

          var component = new PagedResultsListComponent,
            fakeSearchCriteria = {};

          component.onSearchRequest(fakeSearchCriteria);

          expect(component.view.onSearchRequest).toHaveBeenCalled();
          expect(component.view.onSearchRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });
    });
  });
});