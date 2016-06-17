define(function(require) {
  var constants = require('./constants');

  describe('Eplus CE Constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('urls', function() {
      it('.SEARCH_MAP should be defined', function() {
        expect(constants.urls.SEARCH_MAP).toEqual('/programmes/service/es/search/map');
      });
    });
  });
});