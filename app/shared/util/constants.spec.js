define(function(require) {
  var constants = require('./constants');

  describe('Constants - Applications constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('keyboard character codes', function() {
      it('.ENTER should be defined', function() {
        expect(constants.keys.ENTER).toBe(13);
      });
    });

    describe('urls', function() {
      it('.TILEURL should be defined', function() {
        expect(constants.urls.MAP_TILEURL).toEqual('http://europa.eu/webtools/maps/tiles/osm-ec/{z}/{x}/{y}.png');
      });
    });

  });
});