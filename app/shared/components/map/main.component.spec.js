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
      describe('.update', function() {
        it('should be defined', function() {
          expect(MapComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new MapComponent,
            fakeMarkers = [];

          spyOn(component.view, 'update');

          component.update(fakeMarkers);

          expect(component.view.update).toHaveBeenCalledWith(fakeMarkers);
        });
      });
    });
  });
});