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

        describe('Clustering by country', function() {
          it('should contain country cluster property when zoom level is minimum', function() {
            var input = {
              isMaxZoom: false,
              currentZoom: 2,
              minZoom: 2
            }

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              clustering: 'country'
            }));
          });

          it('should contain country cluster property when zoom level is minimum + 2', function() {
            var input = {
              isMaxZoom: false,
              currentZoom: 4,
              minZoom: 2
            }
            
            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              clustering: 'country'
            }));
          });

          it('should not contain country cluster property if zoom level is bigger than minimum + 2', function() {
            var input = {
              isMaxZoom: false,
              currentZoom: 5,
              minZoom: 2
            }

            expect(searchInputMapper.map(input)).not.toEqual(jasmine.objectContaining({
              clustering: 'country'
            }));
          });

          it('should not contain country cluster property if zoom level is maximum', function() {
            var input = {
              isMaxZoom: true,
              currentZoom: 3,
              minZoom: 2
            }

            expect(searchInputMapper.map(input)).not.toEqual(jasmine.objectContaining({
              clustering: 'country'
            }));
          });
        });

        describe('No Clustering', function() {
          it('should contain none cluster property if zoom level is maximum', function() {
            var input = {
                isMaxZoom: true,
                currentZoom: 3,
                minZoom: 2
              };

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              clustering: 'none'
            }));
          });

          it('should not contain none cluster property if zoom level is not maximum', function() {
            var input = {
                isMaxZoom: false,
                currentZoom: 6,
                minZoom: 2
              };

            expect(searchInputMapper.map(input)).not.toEqual(jasmine.objectContaining({
              clustering: 'none'
            }));
          });
        });

        describe('Clustering by boundary', function() {
          it('should contain boundary cluster property when zoom level is not max nor minimum + 1', function() {
            var input = {
                currentZoom: 6,
                minZoom: 2,
                isMaxZoom: false
            }

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              clustering: 'boundary'
            }));
          });

          it('should not contain boundary cluster property when zoom level is max', function() {
            var input = {
                currentZoom: 6,
                minZoom: 2,
                isMaxZoom: true
            }

            expect(searchInputMapper.map(input)).not.toEqual(jasmine.objectContaining({
              clustering: 'boundary'
            }));
          });

          it('should not contain boundary cluster property when zoom level is minimum + 1', function() {
            var input = {
                currentZoom: 3,
                minZoom: 2,
                isMaxZoom: false
            }

            expect(searchInputMapper.map(input)).not.toEqual(jasmine.objectContaining({
              clustering: 'boundary'
            }));
          });
        });

        describe('Other properties', function() {
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
              topLeftLat: 52,
              topLeftLon: 53
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
              bottomRightLat: 54,
              bottomRightLon: 55
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
                sort: 'whatever',
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
              excludedKeys = ['bounds', 'sort'];

            var mapped = searchInputMapper.map(input);

            _.each(excludedKeys, function(excludedKey) {
              expect(_.keys(mapped)).not.toContain(excludedKey);
            });
          });
        });
      });
    });
  });
});