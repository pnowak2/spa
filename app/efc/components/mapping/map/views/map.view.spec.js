define(function(require) {
  var Backbone = require('backbone'),
    constants = require('app/efc/util/constants'),
    MapView = require('./map.view');

  describe('Map View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(MapView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.tagName should be defined', function() {
        expect(MapView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(MapView.prototype.className).toEqual('efc-map');
      });

      it('.tileUrl should be defined', function() {
        expect(MapView.prototype.tileUrl).toEqual(constants.map.TILEURL);
      });
    });

    describe('api', function() {
      describe('.initMap', function() {
        it('should be defined', function() {
          expect(MapView.prototype.initMap).toEqual(jasmine.any(Function));
        });
      });

      describe('.showMarkerComponents', function() {
        it('should be defined', function() {
          expect(MapView.prototype.showMarkerComponents).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new MapView;

          expect(view.render()).toBe(view);
        })
      });
    });
  });
});