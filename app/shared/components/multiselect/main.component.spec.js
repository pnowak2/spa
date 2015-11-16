define(function(require) {
  var Component = require('app/core/component'),
    MultiselectComponent = require('./main.component'),
    MultiselectView = require('./views/multiselect.view');

  describe('Multiselect Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(MultiselectComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have view defined', function() {
        var component = new MultiselectComponent;
        expect(component.view).toEqual(jasmine.any(MultiselectView));
      });
    });
  });
});