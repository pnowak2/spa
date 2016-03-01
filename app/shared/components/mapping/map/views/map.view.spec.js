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
          maxZoom: 7,
          zoomClusterSizeTrigger: 5,
          countryClusterSize: 900,
          localClusterSize: 120
        })
      });
    });

    describe('creation', function() {
      it('should bind callback methods', function() {
        spyOn(_, 'bindAll');

        var view = new MapView;

        expect(_.bindAll).toHaveBeenCalledWith(view, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton', 'didZoomMap');
      });

      it('should create default cluster layers array', function() {
        var view = new MapView;

        expect(view.clusterLayers).toEqual([]);
      });

      it('should create options prefilled with defaults', function() {
        view = new MapView;
        expect(view.options).toEqual(MapView.prototype.defaults);
      });

      it('should accept options to override defaults', function() {
        var options = {
            a: 'a',
            b: 'b',
            minZoom: 1
          },
          view = new MapView(options);

        expect(view.options.a).toEqual('a');
        expect(view.options.b).toEqual('b');
        expect(view.options.minZoom).toEqual(1);
      });
    });

    describe('api', function() {
      describe('.initMap()', function() {
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

      describe('.didZoomMap()', function() {
        beforeEach(function() {
          this.view = new MapView;
          this.view.render();
          this.view.initMap();

          this.belgiumCluster = jasmine.createSpyObj('be', ['ProcessView']);
          this.belgiumCluster.Cluster = {};

          this.view.clusterLayers = [this.belgiumCluster];
        });

        it('should be defined', function() {
          expect(MapView.prototype.didZoomMap).toEqual(jasmine.any(Function));
        });

        it('should set country cluster size for country zoom levels', function() {
          spyOn(this.view.map, 'getZoom').and.returnValue(4);

          this.view.didZoomMap();

          expect(this.belgiumCluster.Cluster.Size).toEqual(this.view.options.countryClusterSize);
          expect(this.belgiumCluster.ProcessView).toHaveBeenCalled();
        });

        it('should set local cluster size for local zoom levels', function() {
          spyOn(this.view.map, 'getZoom').and.returnValue(7);

          this.view.didZoomMap();

          expect(this.belgiumCluster.Cluster.Size).toEqual(this.view.options.localClusterSize);
          expect(this.belgiumCluster.ProcessView).toHaveBeenCalled();
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

        it('should initialize tile layer with correct options', function() {
          this.view.createTileLayer();
          expect(Leaflet.tileLayer).toHaveBeenCalledWith(
            this.view.options.tileUrl, {
              minZoom: this.view.options.minZoom,
              maxZoom: this.view.options.maxZoom
            }
          );
        });
      });

      describe('.showMarkers()', function() {
        beforeEach(function() {
          this.view = new MapView;
          this.fakeLeafletMarkers = [];
          this.fakeData = {
            total: 2,
            markers: []
          }

          spyOn(this.view, 'clearClusterLayers');
          spyOn(this.view, 'createClusterLayersWithMarkers');
          spyOn(this.view, 'updateItemsCount');
          spyOn(this.view, 'toLeafletMarkers').and.returnValue(this.fakeLeafletMarkers);
        });

        it('should be defined', function() {
          expect(MapView.prototype.showMarkers).toEqual(jasmine.any(Function));
        });

        it('should convert data to leaflet markers', function() {
          this.view.showMarkers(this.fakeData);

          expect(this.view.toLeafletMarkers).toHaveBeenCalledWith(this.fakeData.markers);
        });

        it('should clear cluster layers', function() {
          this.view.showMarkers();
          expect(this.view.clearClusterLayers).toHaveBeenCalled();
        });

        it('should create cluster layers with markers', function() {
          this.view.showMarkers();
          expect(this.view.createClusterLayersWithMarkers).toHaveBeenCalledWith(this.fakeLeafletMarkers);
        });

        it('should update items count', function() {
          this.view.showMarkers(this.fakeData);
          expect(this.view.updateItemsCount).toHaveBeenCalledWith(this.fakeData.total);
        });
      });

      describe('.updateItemsCount()', function() {
        beforeEach(function() {
          this.fakeItemsCountHtmlEl = jasmine.createSpyObj('html', ['html']);
          spyOn(MapView.prototype, 'getItemsCountElement').and.returnValue(this.fakeItemsCountHtmlEl);
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

      describe('.toLeafletMarkers()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.toLeafletMarkers).toEqual(jasmine.any(Function));
        });

        it('should create proper marker icon', function() {
          var fakeIcon = {};
          spyOn(MapView.prototype, 'createMarkerIcon').and.returnValue(fakeIcon);

          markersData = [
            [{
              id: '123',
              markerColor: 'blue'
            }]
          ];

          var view = new MapView,
            markers = view.toLeafletMarkers(markersData);

          expect(markers[0][0].data.icon).toEqual(fakeIcon);
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
          this.view.render();
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

      describe('.createClusterLayersWithMarkers()', function() {
        beforeEach(function() {
          this.view = new MapView;
          this.view.render();
          this.view.initMap();

          this.marker1 = {};
          this.marker2 = {};
          this.leafletMarkers = [
            [this.marker1],
            [this.marker2]
          ];

          this.fakeClusterGroupLayer = jasmine.createSpyObj('cluster', ['RegisterMarkers']);

          spyOn(PruneClusterForLeaflet.prototype, 'RegisterMarkers');
          spyOn(this.view.map, 'addLayer');
          spyOn(this.view, 'createClusterGroupLayer').and.returnValue(this.fakeClusterGroupLayer);

          this.view.createClusterLayersWithMarkers(this.leafletMarkers);
        });

        it('should be defined', function() {
          expect(MapView.prototype.createClusterLayersWithMarkers).toEqual(jasmine.any(Function));
        });

        it('should register markers on cluster layer', function() {
          expect(this.fakeClusterGroupLayer.RegisterMarkers).toHaveBeenCalledWith([this.marker1]);
          expect(this.fakeClusterGroupLayer.RegisterMarkers).toHaveBeenCalledWith([this.marker2]);
          expect(this.fakeClusterGroupLayer.RegisterMarkers.calls.count()).toEqual(2);
        });

        it('should add cluster layers to map', function() {
          expect(this.view.map.addLayer).toHaveBeenCalledWith(this.fakeClusterGroupLayer);
          expect(this.view.map.addLayer.calls.count()).toEqual(2);
        });

        it('should push created cluster group layers to view cluster layers', function() {
          expect(this.view.clusterLayers).toEqual([this.fakeClusterGroupLayer, this.fakeClusterGroupLayer]);
        });
      });

      describe('.createClusterGroupLayer()', function() {
        beforeEach(function() {
          spyOn(PruneClusterForLeaflet.prototype, 'initialize').and.callThrough();

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createClusterGroupLayer).toEqual(jasmine.any(Function));
        });

        it('should return correct cluster group layer instance', function() {
          expect(this.view.createClusterGroupLayer()).toEqual(jasmine.any(PruneClusterForLeaflet));
        });

        it('should be initialized with appropriate initial cluster size', function() {
          expect(this.view.createClusterGroupLayer().initialize).toHaveBeenCalledWith(this.view.options.countryClusterSize);
        });
      });

      describe('.createMarkerIcon()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createMarkerIcon).toEqual(jasmine.any(Function));
        });

        it('should return correct icon type', function() {
          expect(this.view.createMarkerIcon()).toEqual(jasmine.any(Leaflet.Icon));
        });

        it('should create default icon if no params provided', function() {
          expect(this.view.createMarkerIcon()).toEqual(jasmine.any(Leaflet.Icon.Default));
        });

        it('should create icon with appropriate anchor and sizes', function() {
          var icon = this.view.createMarkerIcon('blue');
          expect(icon.options.shadowUrl).toContain('marker-shadow.png');
          expect(icon.options.iconSize).toEqual([25, 41]);
          expect(icon.options.iconAnchor).toEqual([12, 41]);
          expect(icon.options.popupAnchor).toEqual([1, -34]);
          expect(icon.options.shadowSize).toEqual([41, 41]);
        });

        it('should create any color marker icon', function() {
          var iconBlue = this.view.createMarkerIcon('blue'),
            iconGreen = this.view.createMarkerIcon('green');
          iconYellow = this.view.createMarkerIcon('yellow');

          expect(iconBlue.options.iconUrl).toContain('marker-blue.png');
          expect(iconGreen.options.iconUrl).toContain('marker-green.png');
          expect(iconYellow.options.iconUrl).toContain('marker-yellow.png');
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
            if (selector === '.efc-map__map-container') {
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
            if (selector === '.efc-map__items-count') {
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
            if (selector === '.efc-map__items-count-container') {
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

        it('should render items count container', function() {
          this.view.render();
          expect(this.view.$el).toContainElement('.efc-map__items-count-container');
        });

        it('should render items count element', function() {
          this.view.render();
          expect(this.view.$el.find('.efc-map__items-count-container')).toContainElement('.efc-map__items-count');
        });

        it('should render items count label', function() {
          this.view.render();
          expect(this.view.$el.find('.efc-map__items-count-container')).toContainText('Showing');
          expect(this.view.$el.find('.efc-map__items-count-container')).toContainText('item(s)');
        });

        it('should render map container', function() {
          this.view.render();
          expect(this.view.$el).toContainElement('.efc-map__map-container');
        });

        it('should render legal note', function() {
          this.view.render();
          expect(this.view.$el).toContainElement('.efc-map__legal-note');
        });
      });
    });
  });
});