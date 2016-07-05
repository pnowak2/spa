define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    PartnersMapView = require('./partnersMap.view'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
    PopupComponent = require('app/shared/components/mapping/popup/main.component'),
    RSVP = require('rsvp'),
    app = require('app/shared/modules/app.module');

  describe('Project Partners View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PartnersMapView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(PartnersMapView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(PartnersMapView.prototype.className).toEqual('efc-partners-map');
        });
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(PartnersMapView.prototype, 'render');
        spyOn(PartnersMapView.prototype, 'showMarkers');
        spyOn(MapComponent.prototype, 'initMap');
        spyOn(MapComponent.prototype, 'initialize');

        this.fakeOptions = {
        	data: {
        		total: 1,
        		coordinator: {},
        		partners: []
        	}
        };
        this.view = new PartnersMapView(this.fakeOptions);
      });

      it('should have map component defined', function() {
        expect(this.view.mapComponent).toEqual(jasmine.any(MapComponent));
      });

      it('should initialize map component with proper options', function() {
        expect(this.view.mapComponent.initialize).toHaveBeenCalledWith({
          countryClusterSize: 15,
          localClusterSize: 15
        });
      });
    });

    describe('api', function() {
       describe('.initMap()', function() {
         it('should be defined', function() {
           expect(PartnersMapView.prototype.initMap).toEqual(jasmine.any(Function));
         });

         it('should delegate to map component', function() {
           var view = new PartnersMapView;
           spyOn(view.mapComponent, 'initMap');

           view.initMap();

           expect(view.mapComponent.initMap).toHaveBeenCalled();
         });
       });

      describe('.showMarkers()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.showMarkers).toEqual(jasmine.any(Function));
        });

        it('should prepare markers from raw data', function() {
        	spyOn(PartnersMapView.prototype, 'prepareMarkersData');

        	var fakeData = {};
        	this.view.showMarkers(fakeData);

        	expect(this.view.prepareMarkersData).toHaveBeenCalledWith(fakeData);
        });

        it('should show prepared markers on map component', function() {
        	var fakeMarkers = [];

        	spyOn(MapComponent.prototype, 'showMarkers');
        	spyOn(PartnersMapView.prototype, 'prepareMarkersData').and.returnValue(fakeMarkers);
        	
        	this.view.showMarkers();

        	expect(this.view.mapComponent.showMarkers).toHaveBeenCalledWith(fakeMarkers);
        });
      });

      describe('.prepareMarkersData()', function() {
        beforeEach(function() {
          this.data = {
            total: 3,
            coordinator: {},
            partners: [
              [{ /* Partner data */ }],
              [{ /* Partner data */ }]
            ]
          }
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.prepareMarkersData).toEqual(jasmine.any(Function));
        });

        it('should not throw if invoked without arguments', function() {
          var self = this;
          expect(function() {
            self.view.prepareMarkersData();
          }).not.toThrow();
        });

        it('should return object with total markers count', function() {
          var markersData = this.view.prepareMarkersData(this.data);
          expect(markersData.total).toEqual(3);
        });

        it('should have coordinator as first cluster group with medium blue icon', function() {
          var coordinator = {},
            fakeCoordinatorMapMarker = {};

          spyOn(PartnersMapView.prototype, 'toMapMarker').and.callFake(function(markerData, markerName) {
            if (markerData === coordinator && markerName === 'blue-medium') {
              return fakeCoordinatorMapMarker
            }
          });

          var markersData = this.view.prepareMarkersData({
            coordinator: coordinator
          });

          expect(markersData.markers[0][0]).toBe(fakeCoordinatorMapMarker)
        });

        it('should have partners as second cluster group with default icons', function() {
          var partner = {},
            fakePartnerMapMarker = {};

          spyOn(PartnersMapView.prototype, 'toMapMarker').and.callFake(function(markerData, markerName) {
            if (markerData === partner && markerName === undefined) {
              return fakePartnerMapMarker
            }
          });

          var markersData = this.view.prepareMarkersData({
            partners: [partner]
          });

          expect(markersData.markers[1][0]).toBe(fakePartnerMapMarker)
        });
      });

      describe('.toMapMarker()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.toMapMarker).toEqual(jasmine.any(Function));
        });

        it('should convert raw marker data to format accepted by map', function() {
          var markerData = {
              name: 'Coordinator name',
              type: 'Coordinator type',
              role: 'Coordinator role',
              address: 'Coordinator address',
              website: 'Coordinator website',
              lat: '2',
              lng: '4'
            },

            popupContent = new PopupComponent({
              type: 'organisation',
              data: markerData
            }).render().view.el,

            mapMarker = this.view.toMapMarker(markerData, 'blue');

          expect(mapMarker.lat).toEqual('2');
          expect(mapMarker.lng).toEqual('4');
          expect(mapMarker.markerName).toEqual('blue');
          expect(mapMarker.popupContent.outerHTML).toEqual(popupContent.outerHTML);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render partners map component', function() {
          var markup = this.view.mapComponent.render().view.el;
          expect(this.view.$el).toContainHtml(markup);
        });
      });
    });
  });
});