define(function(require) {
  var Component = require('app/core/component'),
    SearchableResultsMapView = require('./views/searchableResultsMap.view'),
    SearchableResultsMapComponent = require('./main.component');

  describe('Eplus/CE Searchable Results Map Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchableResultsMapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new SearchableResultsMapComponent;
        expect(component.view).toEqual(jasmine.any(SearchableResultsMapView));
      });
    });

    describe('api', function() {
      describe('.initMap()', function() {
        it('should be defined', function() {
          expect(SearchableResultsMapComponent.prototype.initMap).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new SearchableResultsMapComponent;
          spyOn(component.view, 'initMap');

          component.initMap();

          expect(component.view.initMap).toHaveBeenCalled();
        });
      });

      describe('.onSearchRequest()', function() {
        it('should be defined', function() {
          expect(SearchableResultsMapComponent.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(SearchableResultsMapView.prototype, 'onSearchRequest');

          var component = new SearchableResultsMapComponent,
            fakeSearchCriteria = {};

          component.onSearchRequest(fakeSearchCriteria);

          expect(component.view.onSearchRequest).toHaveBeenCalled();
          expect(component.view.onSearchRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });
    });
  });
});