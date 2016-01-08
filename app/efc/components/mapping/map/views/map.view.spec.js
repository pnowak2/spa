define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    Leaflet = require('leaflet'),
    constants = require('app/efc/util/constants'),
    MapView = require('./map.view'),
    ProjectMarkerComponent = require('app/efc/components/mapping/markers/project/main.component');

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
          tileUrl: constants.map.TILEURL,
          initialZoom: 13,
          initialPosition: [-37.82, 175.24],
          minZoom: 1,
          maxZoom: 16
        })
      });
    });

    describe('api', function() {
      describe('.initMap', function() {
        beforeEach(function() {
          this.fakeMap = jasmine.createSpyObj('map', ['addLayer']);
          this.fakeTileLayer = {};
          this.fakeClusterGroupLayer = {};
          spyOn(MapView.prototype, 'createMap').and.returnValue(this.fakeMap);
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

        it('should create tile layer instance', function() {
          expect(this.view.tileLayer).toBe(this.fakeTileLayer);
        });

        it('should create cluster group layer instance', function() {
          expect(this.view.clusterGroupLayer).toBe(this.fakeClusterGroupLayer);
        });

        it('should add tile layer to the map', function() {
          expect(this.view.map.addLayer).toHaveBeenCalledWith(this.fakeTileLayer);
        });

        it('should add cluster group layer to the map', function() {
          expect(this.view.map.addLayer).toHaveBeenCalledWith(this.fakeClusterGroupLayer);
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

        it('should have map instance referencing view element', function() {
          this.view.createMap();
          expect(Leaflet.map).toHaveBeenCalledWith(this.view.el);
        });

        it('should set map view with default position and zoom', function() {
          var map = this.view.createMap();
          expect(map.setView).toHaveBeenCalledWith(
            this.view.defaults.initialPosition,
            this.view.defaults.initialZoom
          );
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

      describe('.createClusterGroupLayer()', function() {
        beforeEach(function() {
          this.fakeClusterGroupLayer = {};

          spyOn(Leaflet, 'markerClusterGroup').and.callThrough();

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.createClusterGroupLayer).toEqual(jasmine.any(Function));
        });

        it('should return correct cluster group layer instance', function() {
          expect(this.view.createClusterGroupLayer()).toEqual(jasmine.any(Leaflet.MarkerClusterGroup));
        });

        it('should initialize cluster group layer with correct defaults', function() {
          this.view.createClusterGroupLayer();
          expect(Leaflet.markerClusterGroup).toHaveBeenCalledWith({
            chunkedLoading: true,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
          });
        });
      });

      describe('.toLeafletMarker()', function() {
        beforeEach(function() {
          this.fakeMarker = {};

          spyOn(Leaflet, 'marker').and.callThrough();
          spyOn(Leaflet.Marker.prototype, 'bindPopup');

          this.view = new MapView;
        });

        it('should be defined', function() {
          expect(MapView.prototype.toLeafletMarker).toEqual(jasmine.any(Function));
        });

        it('should return correct marker instance', function() {
          var markerComponent = new ProjectMarkerComponent;
          expect(this.view.toLeafletMarker(markerComponent)).toEqual(jasmine.any(Leaflet.Marker));
        });

        it('should create marker with correct lat and lng', function() {
          var markerComponent = new ProjectMarkerComponent({
              markerData: {
                lat: 2,
                lng: 4
              }
            }),
            marker = this.view.toLeafletMarker(markerComponent);

          expect(marker.getLatLng()).toEqual({
            lat: 2,
            lng: 4
          });
        });

        it('should bind correct popup', function() {
          var markerComponent = new ProjectMarkerComponent,
            marker = this.view.toLeafletMarker(markerComponent);

          expect(marker.bindPopup).toHaveBeenCalledWith(markerComponent.render().view.el);
        });
      });

      describe('.toLeafletMarkers()', function() {
        it('should be defined', function() {
          expect(MapView.prototype.toLeafletMarkers).toEqual(jasmine.any(Function));
        });

        it('should convert marker components to leaflet markers', function() {

          var view = new MapView,
            markerComponents = [new ProjectMarkerComponent({
              markerData: {
                lat: 2,
                lng: 4
              }
            })],
            markers = view.toLeafletMarkers(markerComponents);

          expect(markers.length).toBe(1);
          expect(markers[0]).toEqual(jasmine.any(Leaflet.Marker));
          expect(markers[0].getLatLng()).toEqual({
            lat: 2,
            lng: 4
          });
        });
      });

      describe('.showMarkerComponents', function() {
        beforeEach(function() {
          this.view = new MapView;
          this.view.initMap();

          spyOn(this.view.clusterGroupLayer, 'clearLayers');
          spyOn(this.view.clusterGroupLayer, 'addLayers');
        });

        it('should be defined', function() {
          expect(MapView.prototype.showMarkerComponents).toEqual(jasmine.any(Function));
        });

        it('should clear all existing markers', function() {
          this.view.showMarkerComponents();
          expect(this.view.clusterGroupLayer.clearLayers).toHaveBeenCalled();
        });

        it('should add markers to layer', function() {
          var fakeMarkers = [];
          spyOn(this.view, 'toLeafletMarkers').and.returnValue(fakeMarkers);

          this.view.showMarkerComponents();

          expect(this.view.clusterGroupLayer.addLayers).toHaveBeenCalledWith(fakeMarkers);
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