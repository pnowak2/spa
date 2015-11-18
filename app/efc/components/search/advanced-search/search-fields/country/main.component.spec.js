define(function(require) {
  var Component = require('app/core/component'),
    CountryFieldComponent = require('./main.component');

  describe('Country Search Field Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(CountryFieldComponent.prototype).toEqual(jasmine.any(Component));
      });
    });
  });
});