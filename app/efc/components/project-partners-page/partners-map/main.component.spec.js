define(function(require) {
  var Component = require('app/core/component'),
    PartnersMapComponent = require('./main.component'),
    PartnersMapView = require('./views/partnersMap.view');

  describe('Partners Map Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PartnersMapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new PartnersMapComponent;
        expect(component.view).toEqual(jasmine.any(PartnersMapView));
      });
    });

    describe('api', function() {
      describe('.initMap()', function() {
        it('should be defined', function() {
          expect(PartnersMapComponent.prototype.initMap).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new PartnersMapComponent;
          spyOn(component.view, 'initMap');

          component.initMap();

          expect(component.view.initMap).toHaveBeenCalled();
        });
      });
    });
  });
});