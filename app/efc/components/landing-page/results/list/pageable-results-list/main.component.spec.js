define(function(require) {
  var Component = require('app/core/component'),
    PageableResultsListComponent = require('./main.component'),
    PageableResultsListView = require('./views/pageableResultsList.view');

  describe('Pageable Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PageableResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new PageableResultsListComponent;
        expect(component.view).toEqual(jasmine.any(PageableResultsListView));
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        it('should be defined', function() {
          expect(PageableResultsListComponent.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(PageableResultsListView.prototype, 'onSearchRequest');

          var component = new PageableResultsListComponent,
            fakeSearchCriteria = {};

          component.onSearchRequest(fakeSearchCriteria);

          expect(component.view.onSearchRequest).toHaveBeenCalled();
          expect(component.view.onSearchRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });
    });
  });
});