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

      it('should have default tile urls defined', function() {
        expect(MapView.prototype.defaults.tileUrls).toEqual([constants.urls.MAP_TILEURL]);
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

        expect(_.bindAll).toHaveBeenCalledWith(view, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton', 'didZoomMap', 'didDragMap', 'didResizeMap');
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
          this.fakeMap = jasmine.createSpyObj('map', ['addLayer']);
          this.fakeButtonsBar = jasmine.createSpyObj('buttonsBar', ['addTo']);
          this.fakeTileLayers = [{}];

          spyOn(MapView.prototype, 'createMap').and.returnValue(this.fakeMap);
          spyOn(MapView.prototype, 'createButtonsBar').and.returnValue(this.fakeButtonsBar);
          spyOn(MapView.prototype, 'createTileLayers').and.returnValue(this.fakeTileLayers);

          this.view = new MapView;
          this.view.initMap();
        });

        it('should be defined', function() {
          expect(MapView.prototype.initMap).toEqual(jasmine.any(Function));
        });

        it('should create map instance', function() {
          expect(this.view.map).toBe(this.fakeMap);
        });

        it('should create tile layer instance', function() {
          expect(this.view.tileLayers).toBe(this.fakeTileLayers);
        });

        it('should create buttons bar instance', function() {
          expect(this.view.buttonsBar).toBe(this.fakeButtonsBar);
        });

        it('should add buttons bar to the map', function() {
          expect(this.view.buttonsBar.addTo).toHaveBeenCalledWith(this.view.map);
        });

        it('should add tile layers to the map', function() {
          expect(this.view.map.addLayer).toHaveBeenCalledWith(this.fakeTileLayers[0]);
          expect(this.view.map.addLayer.calls.count()).toEqual(1);
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

        it('should listen to map zoom end event', function() {
          var map = this.view.createMap();
          expect(map.on).toHaveBeenCalledWith('zoomend', this.view.didZoomMap);
        });

        it('should listen to map drag end event', function() {
          var map = this.view.createMap();
          expect(map.on).toHaveBeenCalledWith('dragend', this.view.didDragMap);
        });

        it('should listen to map resize event', function() {
          var map = this.view.createMap();
          expect(map.on).toHaveBeenCalledWith('resize', this.view.didResizeMap);
        });
      });

      describe('.createTileLayers()', function() {
        beforeEach(function() {
          spyOn(Leaflet, 'tileLayer').and.callThrough();

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createTileLayers).toEqual(jasmine.any(Function));
        });

        it('should return correct tile layer instances', function() {
          var tileLayers = this.view.createTileLayers();

          _.each(tileLayers, function(tileLayer) {
            expect(tileLayer).toEqual(jasmine.any(Leaflet.TileLayer));
          });
        });

        it('should initialize tile layer with correct options', function() {
          var tileLayers = this.view.createTileLayers();

          expect(tileLayers[0]._url).toEqual(this.view.options.tileUrls[0]);
          expect(tileLayers[0].options.minZoom).toEqual(this.view.options.minZoom);
          expect(tileLayers[0].options.maxZoom).toEqual(this.view.options.maxZoom);

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

      describe('.isMinZoom()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.isMinZoom).toEqual(jasmine.any(Function));
        });

        it('should return true if current zoom is set to minimum', function() {
          var view = new MapView;
          view.map = {
            getZoom: jasmine.createSpy('getZoom').and.returnValue(2),
            getMinZoom: jasmine.createSpy('getMinZoom').and.returnValue(2)
          }

          expect(view.isMinZoom()).toBe(true);
        });

        it('should return false if current zoom is not set to minimum', function() {
          var view = new MapView;
          view.map = {
            getZoom: jasmine.createSpy('getZoom').and.returnValue(4),
            getMinZoom: jasmine.createSpy('getMinZoom').and.returnValue(2)
          }

          expect(view.isMinZoom()).toBe(false);
        });
      });

      describe('.isMaxZoom()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.isMaxZoom).toEqual(jasmine.any(Function));
        });

        it('should return true if current zoom is set to maximum', function() {
          var view = new MapView;
          view.map = {
            getZoom: jasmine.createSpy('getZoom').and.returnValue(10),
            getMaxZoom: jasmine.createSpy('getMinZoom').and.returnValue(10)
          }

          expect(view.isMaxZoom()).toBe(true);
        });

        it('should return false if current zoom is not set to maximum', function() {
          var view = new MapView;
          view.map = {
            getZoom: jasmine.createSpy('getZoom').and.returnValue(4),
            getMaxZoom: jasmine.createSpy('getMinZoom').and.returnValue(10)
          }

          expect(view.isMaxZoom()).toBe(false);
        });
      });

      describe('.getState()', function() {
        beforeEach(function() {
          this.view = new MapView({
            initialZoom: 5
          });

          this.view.map = {
            getZoom: jasmine.createSpy('getZoom').and.returnValue(7),
            getMinZoom: jasmine.createSpy('getMinZoom').and.returnValue(2),
            getMaxZoom: jasmine.createSpy('getMaxZoom').and.returnValue(10),
            getBounds: jasmine.createSpy('getBounds').and.returnValue({
              getNorthEast: jasmine.createSpy('getNorthEast').and.returnValue({
                lat: 52,
                lng: 22
              }),
              getNorthWest: jasmine.createSpy('getNorthWest').and.returnValue({
                lat: 50,
                lng: 20
              }),
              getSouthEast: jasmine.createSpy('getSouthEast').and.returnValue({
                lat: 54,
                lng: 24
              }),
              getSouthWest: jasmine.createSpy('getSouthWest').and.returnValue({
                lat: 56,
                lng: 26
              })
            })
          };

          spyOn(this.view, 'isMinZoom').and.returnValue(true);
          spyOn(this.view, 'isMaxZoom').and.returnValue(true);

          this.state = this.view.getState();
        });

        it('should be defined', function() {
          expect(MapView.prototype.getState).toEqual(jasmine.any(Function));
        });

        it('should contain current zoom information', function() {
          expect(this.state.currentZoom).toEqual(7);
        });

        it('should contain initial zoom information', function() {
          expect(this.state.initialZoom).toEqual(5);
        });

        it('should contain minimum zoom information', function() {
          expect(this.state.minZoom).toEqual(2);
        });

        it('should contain maximum zoom information', function() {
          expect(this.state.maxZoom).toEqual(10);
        });

        it('should contain information if current zoom is set to minimum', function() {
          expect(this.state.isMinZoom).toEqual(true);
        });

        it('should contain information if current zoom is set to maximum', function() {
          expect(this.state.isMaxZoom).toEqual(true);
        });

        it('should contain bounds object', function() {
          expect(this.state.bounds).toEqual(jasmine.any(Object));
        });

        it('should contain bounds for north east', function() {
          expect(this.state.bounds.northEast.lat).toEqual(52);
          expect(this.state.bounds.northEast.lng).toEqual(22);
        });

        it('should contain bounds for north west', function() {
          expect(this.state.bounds.northWest.lat).toEqual(50);
          expect(this.state.bounds.northWest.lng).toEqual(20);
        });

        it('should contain bounds for south east', function() {
          expect(this.state.bounds.southEast.lat).toEqual(54);
          expect(this.state.bounds.southEast.lng).toEqual(24);
        });

        it('should contain bounds for south west', function() {
          expect(this.state.bounds.southWest.lat).toEqual(56);
          expect(this.state.bounds.southWest.lng).toEqual(26);
        });
      });

      describe('.updateItemsCount()', function() {
        beforeEach(function() {
          spyOn(MapView.prototype, 'getItemsCountElement').and.returnValue(jasmine.createSpyObj('html', ['html']));
          spyOn(MapView.prototype, 'getItemsCountContainer').and.returnValue(jasmine.createSpyObj('ctr', ['show']));

          this.view = new MapView;
          this.view.render();
        });

        it('should be defined', function() {
          expect(MapView.prototype.updateItemsCount).toEqual(jasmine.any(Function));
        });

        it('should display items count container', function() {
          this.view.updateItemsCount();
          expect(this.view.getItemsCountContainer().show).toHaveBeenCalled();
        });

        it('should update number of items found with given number', function() {
          this.view.updateItemsCount(242);
          expect(this.view.getItemsCountElement().html).toHaveBeenCalledWith(242);
        });

        it('should put zero count if total items found is not defined', function() {
          this.view.updateItemsCount();
          expect(this.view.getItemsCountElement().html).toHaveBeenCalledWith(0);
        });
      });

      describe('.didZoomMap()', function() {
        beforeEach(function() {
          this.fakeState = {};

          spyOn(MapView.prototype, 'getState').and.returnValue(this.fakeState);
          spyOn(MapView.prototype, 'trigger');
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.didZoomMap).toEqual(jasmine.any(Function));
        });

        it('should trigger bounds changed event', function() {
          this.view.didZoomMap();
          expect(this.view.trigger).toHaveBeenCalledWith('map:bounds-changed', this.fakeState);
        });
      });

      describe('.didDragMap()', function() {
        beforeEach(function() {
          this.fakeState = {};
          spyOn(MapView.prototype, 'getState').and.returnValue(this.fakeState);
          spyOn(MapView.prototype, 'trigger');
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.didDragMap).toEqual(jasmine.any(Function));
        });

        it('should trigger bounds changed event', function() {
          this.view.didDragMap();
          expect(this.view.trigger).toHaveBeenCalledWith('map:bounds-changed', this.fakeState);
        });
      });

      describe('.didResizeMap()', function() {
        beforeEach(function() {
          this.fakeState = {};
          spyOn(MapView.prototype, 'getState').and.returnValue(this.fakeState);
          spyOn(MapView.prototype, 'trigger');
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.didResizeMap).toEqual(jasmine.any(Function));
        });

        it('should trigger bounds changed event', function() {
          this.view.didResizeMap();
          expect(this.view.trigger).toHaveBeenCalledWith('map:bounds-changed', this.fakeState);
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