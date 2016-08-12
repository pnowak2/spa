define(function(require) {
  var constants = require('./constants');

  describe('CE Constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('ccm', function() {
      it('.CE should be defined', function() {
        expect(constants.ccm.CE).toBeDefined();
      });

      it('.CULTURE_2007 should be defined', function() {
        expect(constants.ccm.CULTURE_2007).toBeDefined();
      });

      it('.CULTURE should be defined', function() {
        expect(constants.ccm.CULTURE).toBeDefined();
      });

      it('.MEDIA should be defined', function() {
        expect(constants.ccm.MEDIA).toBeDefined();
      });
    });
  });
});