define(function(require) {
  var Component = require('app/core/component'),
    PartnersMapComponent = require('./main.component');

  describe('Partners Map Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PartnersMapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });
  });
});