define(function(require) {
  var Component = require('app/core/component'),
    ResultsMapView = require('./views/resultsMap.view'),
    ResultsMapComponent = require('./main.component');

  describe('Eplus Results Map Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ResultsMapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new ResultsMapComponent();
        expect(component.view).toEqual(jasmine.any(ResultsMapView));
      });
    });

    describe('api', function() {
      describe('.initMap()', function() {
        it('should be defined', function() {
          expect(ResultsMapComponent.prototype.initMap).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new ResultsMapComponent();
          spyOn(component.view, 'initMap');

          component.initMap();

          expect(component.view.initMap).toHaveBeenCalled();
        });
      });

      describe('.invalidateSize()', function() {
        it('should be defined', function() {
          expect(ResultsMapComponent.prototype.invalidateSize).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new ResultsMapComponent();

          spyOn(component.view, 'invalidateSize');

          component.invalidateSize();

          expect(component.view.invalidateSize).toHaveBeenCalledWith();
        });
      });

      describe('.onSearchRequest()', function() {
        it('should be defined', function() {
          expect(ResultsMapComponent.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(ResultsMapView.prototype, 'onSearchRequest');

          var component = new ResultsMapComponent(),
            fakeSearchCriteria = {};

          component.onSearchRequest(fakeSearchCriteria);

          expect(component.view.onSearchRequest).toHaveBeenCalled();
          expect(component.view.onSearchRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });
    });
  });
});