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

        it('should contain proper clustering method for maximum zoom level', function() {
          var input = {
            isMinZoom: false,
            isMaxZoom: true
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            clustering: 'none'
          }));
        });

        it('should contain proper clustering method for minimum zoom level', function() {
          var input = {
            isMinZoom: true,
            isMaxZoom: false
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            clustering: 'country'
          }));
        });

        it('should contain proper clustering method for medium zoom level', function() {
          var input = {
            isMinZoom: false,
            isMaxZoom: false
          }

          expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
            clustering: 'boundary'
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
            excludedKeys = ['currentZoom', 'initialZoom', 'minZoom', 'maxZoom', 'isMinZoom', 'isMaxZoom', 'bounds'];

          var mapped = searchInputMapper.map(input);

          _.each(excludedKeys, function(excludedKey) {
            expect(_.keys(mapped)).not.toContain(excludedKey);
          });
        });
      });
    });
  });
});