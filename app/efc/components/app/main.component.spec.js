define(function(require) {
  var Component = require('app/core/component'),
    EFCAppView = require('./views/app.view'),
    EFCAppComponent = require('./main.component');

  describe('EfC App Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(EFCAppComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new EFCAppComponent;
        expect(component.view).toEqual(jasmine.any(EFCAppView));
      });
    });
  });
});