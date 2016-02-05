define(function(require) {
  var Component = require('app/core/component'),
    FlagsComponent = require('./main.component'),
    FlagsView = require('./views/flags.view');

  describe('Flags Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(FlagsComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {

      it('should be initialized with proper view', function() {
        var component = new FlagsComponent;
        expect(component.view).toEqual(jasmine.any(FlagsView));
      });

      it('should pass flagDescriptors to view', function() {
        spyOn(FlagsView.prototype, 'initialize');

        var fakeFlagDescriptors = {},
          component = new FlagsComponent(fakeFlagDescriptors);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeFlagDescriptors);
      });
    });
  });
});