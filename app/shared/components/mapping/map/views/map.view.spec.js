define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    Leaflet = require('leaflet'),
    LeafletPruneCluster = require('leafletprunecluster'),
    constants = require('app/shared/util/constants'),
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

      it('.defaults should be properly defined', function() {
        expect(MapView.prototype.defaults).toEqual({
          tileUrl: constants.urls.MAP_TILEURL,
          initialZoom: 4,
          initialPosition: [51, 17],
          minZoom: 4,
          maxZoom: 7
        })
      });
    });

    describe('creation', function() {
      it('should bind callback methods', function() {
        spyOn(_, 'bindAll');

        var view = new MapView;

        expect(_.bindAll).toHaveBeenCalledWith(view, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton');
      });

      it('should create default cluster layers array', function() {
        var view = new MapView;

        expect(view.clusterLayers).toEqual([]);
      });
    });

    describe('api', function() {
      describe('.initMap', function() {
        beforeEach(function() {
          this.fakeMap = jasmine.createSpyObj('map', ['addLayer']);
          this.fakeButtonsBar = jasmine.createSpyObj('buttonsBar', ['addTo']);
          this.fakeTileLayer = {};

          spyOn(MapView.prototype, 'createMap').and.returnValue(this.fakeMap);
          spyOn(MapView.prototype, 'createButtonsBar').and.returnValue(this.fakeButtonsBar);
          spyOn(MapView.prototype, 'createTileLayer').and.returnValue(this.fakeTileLayer);
          spyOn(MapView.prototype, 'createClusterGroupLayer').and.returnValue(this.fakeClusterGroupLayer);

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

        it('should create tile layer instance', function() {
          expect(this.view.tileLayer).toBe(this.fakeTileLayer);
        });

        it('should add buttons bar to the map', function() {
          expect(this.view.buttonsBar.addTo).toHaveBeenCalledWith(this.view.map);
        });

        it('should add tile layer to the map', function() {
          expect(this.view.map.addLayer).toHaveBeenCalledWith(this.fakeTileLayer);
        });
      });

      describe('.createMap()', function() {
        beforeEach(function() {
          spyOn(Leaflet, 'map').and.callThrough();
          spyOn(Leaflet.Map.prototype, 'setView').and.callThrough();

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createMap).toEqual(jasmine.any(Function));
        });

        it('should return correct map instance', function() {
          expect(this.view.createMap()).toEqual(jasmine.any(Leaflet.Map));
        });

        it('should have map instance referencing view element and with correct map options', function() {
          this.view.createMap();
          expect(Leaflet.map).toHaveBeenCalledWith(this.view.el, {
            attributionControl: false
          });
        });

        it('should set map view with default position and zoom', function() {
          var map = this.view.createMap();
          expect(map.setView).toHaveBeenCalledWith(
            this.view.defaults.initialPosition,
            this.view.defaults.initialZoom
          );
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

          expect(fakeMap.setView).toHaveBeenCalledWith(this.view.defaults.initialPosition, this.view.defaults.initialZoom);
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

      describe('.createTileLayer()', function() {
        beforeEach(function() {
          this.fakeTileLayer = {};

          spyOn(Leaflet, 'tileLayer').and.callThrough();

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createTileLayer).toEqual(jasmine.any(Function));
        });

        it('should return correct tile layer instance', function() {
          expect(this.view.createTileLayer()).toEqual(jasmine.any(Leaflet.TileLayer));
        });

        it('should initialize tile layer with correct defaults', function() {
          this.view.createTileLayer();
          expect(Leaflet.tileLayer).toHaveBeenCalledWith(
            this.view.defaults.tileUrl, {
              minZoom: this.view.defaults.minZoom,
              maxZoom: this.view.defaults.maxZoom
            }
          );
        });
      });

      describe('.showMarkers()', function() {
        beforeEach(function() {
          this.view = new MapView;
          this.fakeLeafletMarkers = {};

          spyOn(this.view, 'clearClusterLayers');
          spyOn(this.view, 'createClusterLayersWithMarkers');
          spyOn(this.view, 'toLeafletMarkers').and.returnValue(this.fakeLeafletMarkers);
        });

        it('should be defined', function() {
          expect(MapView.prototype.showMarkers).toEqual(jasmine.any(Function));
        });

        it('should clear cluster layers', function() {
          this.view.showMarkers();
          expect(this.view.clearClusterLayers).toHaveBeenCalled();
        });

        it('should create cluster layers with markers', function() {
          this.view.showMarkers();

          expect(this.view.createClusterLayersWithMarkers).toHaveBeenCalledWith(this.fakeLeafletMarkers);
        });
      });

      describe('.toLeafletMarkers()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.toLeafletMarkers).toEqual(jasmine.any(Function));
        });

        it('should convert marker components to leaflet markers', function() {
          var markersData = [
            [{
              id: '123',
              lat: 2,
              lng: 4,
              popupContent: 'Popup content 1'
            }],
            [{
              id: '456',
              lat: 3,
              lng: 5,
              popupContent: 'Popup content 2'
            }]
          ];

          var view = new MapView,
            markers = view.toLeafletMarkers(markersData);

          expect(markers.length).toBe(2);

          expect(markers[0][0]).toEqual(jasmine.any(PruneCluster.Marker));
          expect(markers[0][0].data.id).toEqual('123');
          expect(markers[0][0].data.popup).toEqual('Popup content 1');
          expect(markers[0][0].position).toEqual({
            lat: 2,
            lng: 4
          });

          expect(markers[1][0]).toEqual(jasmine.any(PruneCluster.Marker));
          expect(markers[1][0].data.id).toEqual('456');
          expect(markers[1][0].data.popup).toEqual('Popup content 2');
          expect(markers[1][0].position).toEqual({
            lat: 3,
            lng: 5
          });
        });
      });

      describe('.clearClusterLayers()', function() {
        beforeEach(function() {
          this.fakeLayer1 = {},
          this.fakeLayer2 = {};

          this.view = new MapView;
          this.view.initMap();

          spyOn(this.view.map, 'removeLayer');
          this.view.clusterLayers = [this.fakeLayer1, this.fakeLayer2];
        });

        it('should be defined', function() {
          expect(MapView.prototype.clearClusterLayers).toEqual(jasmine.any(Function));
        });

        it('should remove registered cluster layers from map', function() {
          this.view.clearClusterLayers();

          expect(this.view.map.removeLayer).toHaveBeenCalledWith(this.fakeLayer1);
          expect(this.view.map.removeLayer).toHaveBeenCalledWith(this.fakeLayer2);
        });

        it('should empty cluster layers array', function() {
          expect(this.view.clusterLayers).toEqual([this.fakeLayer1, this.fakeLayer2]);

          this.view.clearClusterLayers();

          expect(this.view.clusterLayers).toEqual([]);
        });
      });

      describe('.createClusterGroupLayer()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createClusterGroupLayer).toEqual(jasmine.any(Function));
        });

        it('should return correct cluster group layer instance', function() {
          expect(this.view.createClusterGroupLayer()).toEqual(jasmine.any(PruneClusterForLeaflet));
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new MapView;

          expect(view.render()).toBe(view);
        });
      });
    });
  });
});