define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    Leaflet = require('leaflet'),
    LeafletPruneCluster = require('leafletprunecluster'),
    constants = require('app/shared/util/constants'),
    MapView = require('./map.view');

  describe('Extended Map View', function() {
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
        expect(MapView.prototype.className).toEqual('vlr-map');
      });
    });

    describe('defaults', function() {
      it('should have defaults property defined', function() {
        expect(MapView.prototype.defaults).toEqual(jasmine.any(Object));
      });
    });

    describe('creation', function() {
      
    });

    describe('api', function() {
      describe('.initMap()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.initMap).toEqual(jasmine.any(Function));
        });
      });

      describe('.showMarkers()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.showMarkers).toEqual(jasmine.any(Function));
        });
      });

      describe('.getMapContainerElement()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.getMapContainerElement).toEqual(jasmine.any(Function));
        });

        it('should return map container element', function() {
          var view = new MapView,
            fakeMapContainer = {};

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.vlr-map__map-container') {
              return {
                get: function(index) {
                  if (index === 0) {
                    return fakeMapContainer
                  }
                }
              };
            }
          });

          expect(view.getMapContainerElement()).toBe(fakeMapContainer);
        });
      });

      describe('.getItemsCountElement()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.getItemsCountElement).toEqual(jasmine.any(Function));
        });

        it('should return items count element', function() {
          var view = new MapView,
            fakeItemsCountElement = {};

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.vlr-map__items-count') {
              return fakeItemsCountElement;
            }
          });

          expect(view.getItemsCountElement()).toBe(fakeItemsCountElement);
        });
      });

      describe('.getItemsCountContainer()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.getItemsCountContainer).toEqual(jasmine.any(Function));
        });

        it('should return items count container element', function() {
          var view = new MapView,
            fakeItemsCountContainer = {};

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.vlr-map__items-count-container') {
              return fakeItemsCountContainer;
            }
          });

          expect(view.getItemsCountContainer()).toBe(fakeItemsCountContainer);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render map container', function() {
          this.view.render();
          expect(this.view.$el).toContainElement('.vlr-map__map-container');
        });

        it('should render items count container', function() {
          this.view.render();
          expect(this.view.$el).toContainElement('.vlr-map__items-count-container');
        });

        it('should render items count element', function() {
          this.view.render();
          expect(this.view.$el.find('.vlr-map__items-count-container')).toContainElement('.vlr-map__items-count');
        });

        it('should render items count label', function() {
          this.view.render();
          expect(this.view.$el.find('.vlr-map__items-count-container')).toContainText('Found');
          expect(this.view.$el.find('.vlr-map__items-count-container')).toContainText('0 item(s)');
        });

        it('should render legal note', function() {
          this.view.render();
          expect(this.view.$el).toContainElement('.vlr-map__legal-note');
        });
      });
    });
  });
});