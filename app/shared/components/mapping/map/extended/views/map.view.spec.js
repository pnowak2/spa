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

      it('should have default initial position defined', function() {
        expect(MapView.prototype.defaults.initialPosition).toEqual([53, 17]);
      });

      it('should have default initial zoom defined', function() {
        expect(MapView.prototype.defaults.initialZoom).toEqual(4);
      });

      it('should have default minimum zoom defined', function() {
        expect(MapView.prototype.defaults.minZoom).toEqual(3);
      });

      it('should have default maximum zoom defined', function() {
        expect(MapView.prototype.defaults.maxZoom).toEqual(7);
      });
    });

    describe('creation', function() {
      it('should bind callback methods', function() {
        spyOn(_, 'bindAll');

        var view = new MapView;

        expect(_.bindAll).toHaveBeenCalledWith(view, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton');
      });

      it('should create options prefilled with defaults', function() {
        view = new MapView;
        expect(view.options).toEqual(MapView.prototype.defaults);
      });

      it('should accept options to override defaults', function() {
        var options = {
            a: 'a',
            b: 'b'
          },
          view = new MapView(options);

        expect(view.options.a).toEqual('a');
        expect(view.options.b).toEqual('b');
      });
    });

    describe('api', function() {
      describe('.initMap()', function() {
        beforeEach(function() {
          this.fakeButtonsBar = jasmine.createSpyObj('buttonsBar', ['addTo']);

          spyOn(MapView.prototype, 'createMap').and.returnValue(this.fakeMap);
          spyOn(MapView.prototype, 'createButtonsBar').and.returnValue(this.fakeButtonsBar);

          this.view = new MapView;
          this.view.initMap();
        });

        it('should be defined', function() {
          expect(MapView.prototype.initMap).toEqual(jasmine.any(Function));
        });

        it('should create map instance', function() {
          expect(this.view.map).toBe(this.fakeMap);
        });

        it('should create buttons bar instance', function() {
          expect(this.view.buttonsBar).toBe(this.fakeButtonsBar);
        });

        it('should add buttons bar to the map', function() {
          expect(this.view.buttonsBar.addTo).toHaveBeenCalledWith(this.view.map);
        });
      });

      describe('.createMap()', function() {
        beforeEach(function() {
          this.fakeMap = jasmine.createSpyObj('map', ['setView', 'on']);
          spyOn(Leaflet, 'map').and.returnValue(this.fakeMap);
          spyOn(Leaflet.Map.prototype, 'setView');

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createMap).toEqual(jasmine.any(Function));
        });

        it('should return correct map instance', function() {
          expect(this.view.createMap()).toEqual(this.fakeMap);
        });

        it('should have map instance referencing view element and with correct map options', function() {
          var fakeMapContainer = {};
          spyOn(this.view, 'getMapContainerElement').and.returnValue(fakeMapContainer);

          this.view.createMap();

          expect(Leaflet.map).toHaveBeenCalledWith(fakeMapContainer, {
            attributionControl: false,
            worldCopyJump: true
          });
        });

        it('should set map view with default position and zoom', function() {
          var map = this.view.createMap();
          expect(map.setView).toHaveBeenCalledWith(
            this.view.options.initialPosition,
            this.view.options.initialZoom
          );
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

      describe('.createButtonsBar()', function() {
        beforeEach(function() {
          this.fakeEasyBar = {};
          this.fakeHomeButton = {};
          this.fakeFullscreenButton = {};
          this.fakePrintButton = {};

          spyOn(Leaflet, 'easyBar').and.returnValue(this.fakeEasyBar);
          spyOn(MapView.prototype, 'createHomeButton').and.returnValue(this.fakeHomeButton);
          spyOn(MapView.prototype, 'createFullscreenButton').and.returnValue(this.fakeFullscreenButton);
          spyOn(MapView.prototype, 'createPrintButton').and.returnValue(this.fakePrintButton);

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createButtonsBar).toEqual(jasmine.any(Function));
        });

        it('should return correct buttons bar instance', function() {
          expect(this.view.createButtonsBar()).toEqual(this.fakeEasyBar);
        });

        it('create buttons bar with correct buttons and position', function() {
          this.view.createButtonsBar();

          expect(Leaflet.easyBar).toHaveBeenCalledWith([
            this.fakeHomeButton,
            this.fakeFullscreenButton,
            this.fakePrintButton
          ], {
            position: 'topleft'
          });
        });
      });

      describe('.createHomeButton()', function() {
        beforeEach(function() {
          this.fakeButton = {};
          spyOn(Leaflet, 'easyButton').and.returnValue(this.fakeButton);

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createHomeButton).toEqual(jasmine.any(Function));
        });

        it('return correctly initialized button', function() {
          var btn = this.view.createHomeButton();

          expect(Leaflet.easyButton).toHaveBeenCalledWith('fa-home', this.view.didClickHomeButton);
          expect(btn).toBe(this.fakeButton);
        });
      });

      describe('.createFullscreenButton()', function() {
        beforeEach(function() {
          this.fakeButton = {};
          spyOn(Leaflet, 'easyButton').and.returnValue(this.fakeButton);

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createFullscreenButton).toEqual(jasmine.any(Function));
        });

        it('return correctly initialized button', function() {
          var btn = this.view.createFullscreenButton();

          expect(Leaflet.easyButton).toHaveBeenCalledWith('fa-arrows-alt', this.view.didClickFullscreenButton);
          expect(btn).toBe(this.fakeButton);
        });
      });

      describe('.createPrintButton()', function() {
        beforeEach(function() {
          this.fakeButton = {};
          spyOn(Leaflet, 'easyButton').and.returnValue(this.fakeButton);

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createPrintButton).toEqual(jasmine.any(Function));
        });

        it('return correctly initialized button', function() {
          var btn = this.view.createPrintButton();

          expect(Leaflet.easyButton).toHaveBeenCalledWith('fa-print', this.view.didClickPrintButton);
          expect(btn).toBe(this.fakeButton);
        });
      });

      describe('.didClickHomeButton()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.didClickHomeButton).toEqual(jasmine.any(Function));
        });

        it('should reset position and zoom to default states', function() {
          var fakeBtn = {},
            fakeMap = jasmine.createSpyObj('map', ['setView']);

          this.view.didClickHomeButton(fakeBtn, fakeMap);

          expect(fakeMap.setView).toHaveBeenCalledWith(this.view.options.initialPosition, this.view.options.initialZoom);
        });
      });

      describe('.didClickFullscreenButton()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.didClickFullscreenButton).toEqual(jasmine.any(Function));
        });

        it('should toggle map to fullscreen back and forth', function() {
          var fakeBtn = {},
            fakeMap = jasmine.createSpyObj('map', ['toggleFullscreen']);

          this.view.didClickFullscreenButton(fakeBtn, fakeMap);

          expect(fakeMap.toggleFullscreen).toHaveBeenCalled();
        });
      });

      describe('.didClickPrintButton()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.didClickPrintButton).toEqual(jasmine.any(Function));
        });

        it('should print the map', function() {
          spyOn(window, 'print');

          this.view.didClickPrintButton();

          expect(window.print).toHaveBeenCalled();
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