define(function(require) {
  var constants = require('app/core/constants');

  describe('Constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('keys', function() {
      it('should be defined', function() {
        expect(constants.dom.keys).toEqual(jasmine.any(Object));
      });

      it('ENTER', function() {
        expect(constants.dom.keys.ENTER).toBe(13);
      });
    });
  });
});