define(function(require) {
  var Component = require('app/core/component'),
    MapComponent = require('./main.component'),
    MapView = require('./views/map.view');

  describe('Extended Map component', function() {
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

      it('should pass options to view', function() {
        spyOn(MapView.prototype, 'initialize');
        var fakeOptions = {},
          component = new MapComponent(fakeOptions);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeOptions);
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

      describe('.getState()', function() {
        it('should be defined', function() {
          expect(MapComponent.prototype.getState).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var fakeState = {};
          spyOn(MapView.prototype, 'getState').and.returnValue(fakeState);

          var component = new MapComponent;

          expect(component.getState()).toBe(fakeState);

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

    describe('events', function() {
      it('should trigger event on map bounds change', function(done) {
        var component = new MapComponent,
          fakeEventDetails = {};

        component.on('map:bounds-changed', function(mapState) {
          expect(fakeEventDetails).toBe(mapState);
          done();
        });

        component.view.trigger('map:bounds-changed', fakeEventDetails);
      });
    });
  });
});