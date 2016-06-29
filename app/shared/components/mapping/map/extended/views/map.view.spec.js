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

      it('should have default cluster size for ', function() {
        expect(MapView.prototype.defaults.clusterSizeOnMaxZoomLevel).toEqual(120);
      });
    });

    describe('creation', function() {
      it('should bind callback methods', function() {
        spyOn(_, 'bindAll');

        var view = new MapView;

        expect(_.bindAll).toHaveBeenCalledWith(view, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton', 'didClickClusterMarker', 'didZoomMap', 'didDragMap', 'didResizeMap');
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
          spyOn(MapView.prototype, 'updateItemsCount');
          this.fakeData = {
            total: 2
          }

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.showMarkers).toEqual(jasmine.any(Function));
        });

        it('should work without arguments', function() {
          expect(function() {
            this.view.showMarkers((void 0));
          }).not.toThrow();

        });

        it('should update items count', function() {
          this.view.showMarkers(this.fakeData);
          expect(this.view.updateItemsCount).toHaveBeenCalledWith(this.fakeData.total);
        });
      });

      describe('.toLeafletMarkers()', function() {
        beforeEach(function() {
          var items = [{
            type: 'marker',
            icon: 'marker-blue',
            lat: 51,
            lng: 21,
            id: 'one',
            popupContent: 'Popup One'
          }, {
            type: 'marker',
            lat: 52,
            lng: 22,
            group: 'pl',
            id: 'two',
            popupContent: 'Popup Two'
          }, {
            type: 'marker',
            icon: 'marker-green',
            lat: 53,
            lng: 23,
            group: 'de',
            id: 'three',
            popupContent: 'Popup Three'
          }, {
            type: 'marker',
            lat: 54,
            lng: 24,
            group: 'pl',
            id: 'four',
            popupContent: 'Popup Four'
          }, {
            type: 'cluster',
            lat: 55,
            lng: 25,
            itemsCount: 22
          }, {
            type: 'cluster',
            lat: 56,
            lng: 26,
            itemsCount: 12
          }];

          this.fakeIcon = {};
          spyOn(MapView.prototype, 'createMarkerIcon').and.returnValue(this.fakeIcon);

          this.view = new MapView;
          this.leafletMarkers = view.toLeafletMarkers(items);
        });

        it('should be defined', function() {
          expect(MapView.prototype.toLeafletMarkers).toEqual(jasmine.any(Function));
        });

        describe('Collection properties', function() {
          it('should have proper grouped markers count', function() {
            expect(this.leafletMarkers.length).toBe(3);
          });
        });

        describe('First element in collection', function() {
          it('should have one marker', function() {
            expect(this.leafletMarkers[0].length).toBe(1);
          });

          it('should have proper marker type ', function() {
            expect(this.leafletMarkers[0][0]).toEqual(jasmine.any(PruneCluster.Marker));
          });

          it('should have proper marker icon', function() {
            expect(this.view.createMarkerIcon).toHaveBeenCalledWith('marker-blue');
            expect(this.leafletMarkers[0][0].data.icon).toEqual(this.fakeIcon);
          });

          it('should have proper marker position', function() {
            expect(this.leafletMarkers[0][0].position).toEqual({
              lat: 51,
              lng: 21
            });
          });

          it('should have proper marker id', function() {
            expect(this.leafletMarkers[0][0].data.id).toEqual('one');
          });

          it('should have proper marker popup', function() {
            expect(this.leafletMarkers[0][0].data.popup).toEqual('Popup One');
          });

          it('should have proper marker popup options', function() {
            expect(this.leafletMarkers[0][0].data.popupOptions).toEqual({
              autoPanPadding: [48, 42]
            });
          });
        });

        describe('Second element in collection', function() {
          it('should have two markers', function() {
            expect(this.leafletMarkers[1].length).toBe(2);
          });

          it('should have proper marker type ', function() {
            expect(this.leafletMarkers[1][0]).toEqual(jasmine.any(PruneCluster.Marker));
            expect(this.leafletMarkers[1][1]).toEqual(jasmine.any(PruneCluster.Marker));
          });

          it('should have proper marker icon', function() {
            expect(this.view.createMarkerIcon).toHaveBeenCalledWith(undefined);
            expect(this.leafletMarkers[1][0].data.icon).toEqual(this.fakeIcon);
            expect(this.leafletMarkers[1][1].data.icon).toEqual(this.fakeIcon);
          });

          it('should have proper marker position', function() {
            expect(this.leafletMarkers[1][0].position).toEqual({
              lat: 52,
              lng: 22
            });

            expect(this.leafletMarkers[1][1].position).toEqual({
              lat: 54,
              lng: 24
            });
          });

          it('should have proper marker id', function() {
            expect(this.leafletMarkers[1][0].data.id).toEqual('two');
            expect(this.leafletMarkers[1][1].data.id).toEqual('four');
          });

          it('should have proper marker popup', function() {
            expect(this.leafletMarkers[1][0].data.popup).toEqual('Popup Two');
            expect(this.leafletMarkers[1][1].data.popup).toEqual('Popup Four');
          });

          it('should have proper marker popup options', function() {
            expect(this.leafletMarkers[1][0].data.popupOptions).toEqual({
              autoPanPadding: [48, 42]
            });

            expect(this.leafletMarkers[1][1].data.popupOptions).toEqual({
              autoPanPadding: [48, 42]
            });
          });
        });

        describe('Third element in collection', function() {
          it('should have one marker', function() {
            expect(this.leafletMarkers[2].length).toBe(1);
          });

          it('should have proper marker type ', function() {
            expect(this.leafletMarkers[2][0]).toEqual(jasmine.any(PruneCluster.Marker));
          });

          it('should have proper marker icon', function() {
            expect(this.view.createMarkerIcon).toHaveBeenCalledWith('marker-green');
            expect(this.leafletMarkers[2][0].data.icon).toEqual(this.fakeIcon);
          });

          it('should have proper marker position', function() {
            expect(this.leafletMarkers[2][0].position).toEqual({
              lat: 53,
              lng: 23
            });
          });

          it('should have proper marker id', function() {
            expect(this.leafletMarkers[2][0].data.id).toEqual('three');
          });

          it('should have proper marker popup', function() {
            expect(this.leafletMarkers[2][0].data.popup).toEqual('Popup Three');
          });

          it('should have proper marker popup options', function() {
            expect(this.leafletMarkers[2][0].data.popupOptions).toEqual({
              autoPanPadding: [48, 42]
            });
          });
        });
      });

      describe('.toClusterMarkers()', function() {
        beforeEach(function() {
          this.items = [{
            type: 'marker'
          }, {
            type: 'marker'
          }, {
            type: 'marker'
          }, {
            type: 'cluster',
            lat: 55,
            lng: 25,
            itemsCount: 22
          }, {
            type: 'cluster',
            lat: 56,
            lng: 26,
            itemsCount: 12
          }];
          this.fakeIcon = {};
          spyOn(Leaflet.Marker.prototype, 'on');
          spyOn(MapView.prototype, 'createMarkerIcon').and.returnValue(this.fakeIcon);

          this.view = new MapView;
          this.clusterMarkers = view.toClusterMarkers(this.items);
        });

        it('should be defined', function() {
          expect(MapView.prototype.toClusterMarkers).toEqual(jasmine.any(Function));
        });

        describe('Collection properties', function() {
          it('should have proper cluster markers count', function() {
            expect(this.clusterMarkers.length).toBe(2);
          });
        });

        describe('First element in collection', function() {
          it('should have proper marker type ', function() {
            expect(this.clusterMarkers[0]).toEqual(jasmine.any(Leaflet.Marker));
          });

          it('should have proper marker icon', function() {
            expect(this.view.createMarkerIcon).toHaveBeenCalledWith('cluster', {
              population: 22
            });
            expect(this.clusterMarkers[0].options.icon).toEqual(this.fakeIcon);
          });

          it('should have proper marker position', function() {
            expect(this.clusterMarkers[0].getLatLng()).toEqual({
              lat: 55,
              lng: 25
            });
          });

          it('should have click event defined', function() {
          var view = new MapView,
           clusterMarkers = view.toClusterMarkers(this.items);

            expect(this.clusterMarkers[0].on).toHaveBeenCalledWith('click', view.didClickClusterMarker);
          });
        });

        describe('Second element in collection', function() {
          it('should have proper marker type ', function() {
            expect(this.clusterMarkers[1]).toEqual(jasmine.any(Leaflet.Marker));
          });

          it('should have proper marker icon', function() {
            expect(this.view.createMarkerIcon).toHaveBeenCalledWith('cluster', {
              population: 12
            });
            expect(this.clusterMarkers[1].options.icon).toEqual(this.fakeIcon);
          });

          it('should have proper marker position', function() {
            expect(this.clusterMarkers[1].getLatLng()).toEqual({
              lat: 56,
              lng: 26
            });
          });

          it('should have click event defined', function() {
          var view = new MapView,
           clusterMarkers = view.toClusterMarkers(this.items);

            expect(this.clusterMarkers[1].on).toHaveBeenCalledWith('click', view.didClickClusterMarker);
          });
        });
      });

      describe('.createMarkerIcon()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createMarkerIcon).toEqual(jasmine.any(Function));
        });

        it('should create default icon if no params provided', function() {
          expect(this.view.createMarkerIcon()).toEqual(jasmine.any(Leaflet.Icon.Default));
        });

        it('should create blue marker icon', function() {
          var icon = this.view.createMarkerIcon('marker-blue');

          expect(icon).toEqual(jasmine.any(Leaflet.Icon));
          expect(icon.options.iconUrl).toContain('marker-blue.png');
          expect(icon.options.shadowUrl).toContain('marker-shadow.png');
          expect(icon.options.iconSize).toEqual([25, 41]);
          expect(icon.options.iconAnchor).toEqual([12, 41]);
          expect(icon.options.popupAnchor).toEqual([1, -34]);
          expect(icon.options.shadowSize).toEqual([41, 41]);
        });

        it('should create cluster icon', function() {
          var icon = this.view.createMarkerIcon('cluster', {
            population: 22
          });

          expect(icon).toEqual(jasmine.any(Leaflet.DivIcon));
          expect(icon.options.html).toEqual('<div><span>22</span></div>');
          expect(icon.options.className).toEqual('prunecluster prunecluster-medium');
          expect(icon.options.iconSize).toEqual(Leaflet.point(38, 38));
        });
      });

      describe('.clearMarkers()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.clearMarkers).toEqual(jasmine.any(Function));
        });
      });

      describe('.createClusterGroupLayer()', function() {
        beforeEach(function() {
          spyOn(MapView.prototype, 'calculateClusterSize').and.returnValue(222);
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createClusterGroupLayer).toEqual(jasmine.any(Function));
        });

        it('should return correct cluster group layer instance', function() {
          expect(this.view.createClusterGroupLayer()).toEqual(jasmine.any(PruneClusterForLeaflet));
        });

        it('should be initialized with appropriate initial cluster size', function() {
          spyOn(PruneClusterForLeaflet.prototype, 'initialize');

          expect(this.view.createClusterGroupLayer().initialize).toHaveBeenCalledWith(222);
        });
      });

      describe('.calculateClusterSize()', function() {
        beforeEach(function() {
          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.calculateClusterSize).toEqual(jasmine.any(Function));
        });

        it('should return minimum clustering for zoom levels other than maximum', function() {
          spyOn(MapView.prototype, 'isMaxZoom').and.returnValue(false);

          expect(this.view.calculateClusterSize()).toBe(.0000000000001);
        });

        it('should return default clustering for zoom level maximum', function() {
          spyOn(MapView.prototype, 'isMaxZoom').and.returnValue(true);
          this.view.options.clusterSizeOnMaxZoomLevel = 850;

          expect(this.view.calculateClusterSize()).toBe(850);
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

      describe('.didClickClusterMarker()', function() {
        beforeEach(function() {
          this.view = new MapView;
          this.view.map = {
            getZoom: jasmine.createSpy('getZoom').and.returnValue(6),
            setView: jasmine.createSpy('setView')
          }
        });

        it('should be defined', function() {
          expect(MapView.prototype.didClickClusterMarker).toEqual(jasmine.any(Function));
        });

        it('should behave...', function() {
          var fakeEvent = {
            latlng: [52, 42]
          }
          this.view.didClickClusterMarker(fakeEvent);

          expect(this.view.map.setView).toHaveBeenCalledWith([52, 42], 7);
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