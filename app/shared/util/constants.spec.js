define(function(require) {
  var constants = require('./constants');

  describe('Constants - Applications constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('keys', function() {
      it('namespace should be defined', function() {
        expect(constants.keys).toEqual(jasmine.any(Object));
      });

      it('.ENTER should be defined', function() {
        expect(constants.keys.ENTER).toBe(13);
      });
    });

  });
});