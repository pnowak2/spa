define(function(require) {
  var Component = require('app/core/component'),
    SearchableResultsListComponent = require('./main.component'),
    SearchableResultsListView = require('./views/searchableResultsList.view');

  describe('CE Searchable Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchableResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new SearchableResultsListComponent();
        expect(component.view).toEqual(jasmine.any(SearchableResultsListView));
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        it('should be defined', function() {
          expect(SearchableResultsListComponent.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(SearchableResultsListView.prototype, 'onSearchRequest');

          var component = new SearchableResultsListComponent(),
            fakeSearchCriteria = {};

          component.onSearchRequest(fakeSearchCriteria);

          expect(component.view.onSearchRequest).toHaveBeenCalled();
          expect(component.view.onSearchRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });

      describe('.onExportToXlsRequest()', function() {
        it('should be defined', function() {
          expect(SearchableResultsListComponent.prototype.onExportToXlsRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(SearchableResultsListView.prototype, 'onExportToXlsRequest');

          var component = new SearchableResultsListComponent(),
            fakeSearchCriteria = {};

          component.onExportToXlsRequest(fakeSearchCriteria);

          expect(component.view.onExportToXlsRequest).toHaveBeenCalled();
          expect(component.view.onExportToXlsRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });
    });

    describe('events', function() {
      it('should listen to view search completed event', function() {
        spyOn(SearchableResultsListComponent.prototype, 'trigger');

        var component = new SearchableResultsListComponent(),
          fakeData = {};

        component.view.trigger('search:completed', fakeData);

        expect(component.trigger).toHaveBeenCalledWith('search:completed', fakeData);
      });
    });
  });
});