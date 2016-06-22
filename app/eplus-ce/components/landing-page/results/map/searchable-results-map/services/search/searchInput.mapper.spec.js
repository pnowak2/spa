define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper');

  describe('Eplus/CE Search Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchInputMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map()', function() {
        it('should be defined', function() {
          expect(searchInputMapper.map).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          expect(function() {
            searchInputMapper.map();
          }).not.toThrow();
        });

        it('should return proper defaults if called without arguments', function() {
          expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({}));
        });

        it('should contain minimum zoom level', function() {
          var input = {
            minZoom: 2
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            minZoom: 2
          }));
        });

        it('should contain maximum zoom level', function() {
          var input = {
            maxZoom: 7
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            maxZoom: 7
          }));
        });

        it('should contain current zoom level', function() {
          var input = {
            currentZoom: 7
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            currentZoom: 7
          }));
        });

        it('should contain top left boundary point', function() {
          var input = {
            bounds: {
              northWest: {
                lat: 52,
                lng: 53
              }
            }
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            top_left_lat: 52,
            top_left_lon: 53
          }));
        });

        it('should contain bottom right boundary point', function() {
          var input = {
            bounds: {
              southEast: {
                lat: 54,
                lng: 55
              }
            }
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            bottom_right_lat: 54,
            bottom_right_lon: 55
          }));
        });

        it('should keep search criteria ', function() {
          var input = {
            keyword: 'bar'
          };

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            keyword: 'bar'
          }));
        });

        it('should remove redundant properties', function() {
          var input = {
              currentZoom: 5,
              initialZoom: 4,
              minZoom: 2,
              maxZoom: 10,
              isMinZoom: false,
              isMaxZoom: false,
              bounds: {
                southEast: {
                  lat: 54,
                  lng: 55
                }
              }
            },
            excludedKeys = ['bounds'];

          var mapped = searchInputMapper.map(input);

          _.each(excludedKeys, function(excludedKey) {
            expect(_.keys(mapped)).not.toContain(excludedKey);
          });
        });
      });
    });
  });
});