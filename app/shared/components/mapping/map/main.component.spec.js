define(function(require) {
  var Component = require('app/core/component'),
    MapComponent = require('./main.component'),
    MapView = require('./views/map.view');

  describe('Map component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(MapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.mapComponent = new MapComponent;
      });

      it('should be initialized with proper view', function() {
        expect(this.mapComponent.view).toEqual(jasmine.any(MapView));
      });
    });

    describe('api', function() {
      describe('.initMap()', function() {
        it('should be defined', function() {
          expect(MapComponent.prototype.initMap).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new MapComponent;
          spyOn(component.view, 'initMap');

          component.initMap();

          expect(component.view.initMap).toHaveBeenCalled();
        });
      });

      describe('.showMarkers()', function() {
        it('should be defined', function() {
          expect(MapComponent.prototype.showMarkers).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new MapComponent,
            fakeMarkersData = [];

          spyOn(component.view, 'showMarkers');

          component.showMarkers(fakeMarkersData);

          expect(component.view.showMarkers).toHaveBeenCalledWith(fakeMarkersData);
        });
      });
    });
  });
});