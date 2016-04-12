define(function(require) {
  var Component = require('app/core/component'),
    PartnersMapView = require('./views/partnersMap.view'),
    PartnersMapComponent = require('./main.component');

  describe('Partners Map Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PartnersMapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        spyOn(PartnersMapView.prototype, 'initialize');
        
        var component = new PartnersMapComponent;
        expect(component.view).toEqual(jasmine.any(PartnersMapView));
      });

      it('should initialize view with project id', function() {
        spyOn(PartnersMapView.prototype, 'initialize');

        var options = {},
          component = new PartnersMapComponent(options);

        expect(component.view.initialize).toHaveBeenCalledWith(options);
      });
    });
  });
});