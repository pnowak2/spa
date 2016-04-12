define(function(require) {
  var constants = require('./constants');

  describe('EFC Constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('urls', function() {
      it('.PROJECT_PARTNERS should be defined', function() {
        expect(constants.urls.PROJECT_PARTNERS).toEqual('/programmes/service/es/project/partners');
      });
    });
  });
});