define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    PartnersMapView = require('./partnersMap.view'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
    PopupComponent = require('app/shared/components/mapping/popup/main.component'),
    projectPartnersService = require('../services/projectPartners.service'),
    RSVP = require('rsvp'),
    app = require('app/shared/modules/app.module');

  describe('EFC Project Partners View', function() {
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
        spyOn(_, 'bindAll').and.callThrough();
        spyOn(PartnersMapView.prototype, 'render');
        spyOn(PartnersMapView.prototype, 'requestInitialSearch');
        spyOn(MapComponent.prototype, 'initialize');
        spyOn(MapComponent.prototype, 'initMap');

        this.fakeCriteria = {
          id: '6'
        };

        this.view = new PartnersMapView(this.fakeCriteria);
      });

      it('should bind callback methods with view object', function() {
        expect(_.bindAll).toHaveBeenCalledWith(this.view, 'didFindSucceed', 'didFindFail');
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

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the map', function() {
        expect(this.view.mapComponent.initMap).toHaveBeenCalled();
      });

      it('should perform initial request', function() {
        expect(this.view.requestInitialSearch).toHaveBeenCalledWith(this.fakeCriteria);
      });
    });

    describe('api', function() {
      describe('.requestInitialSearch()', function() {
        beforeEach(function() {
          spyOn(PartnersMapView.prototype, 'onFindRequest');
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.requestInitialSearch).toEqual(jasmine.any(Function));
        });

        it('should perform search request with proper criteria', function() {
          var fakeCriteria = {};

          this.view.requestInitialSearch(fakeCriteria)

          expect(this.view.onFindRequest).toHaveBeenCalledWith(fakeCriteria);
        });
      });

      describe('.onFindRequest()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.onFindRequest).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without args', function() {
          var self = this;
          expect(function() {
            self.view.onFindRequest();
          }).not.toThrow();
        });

        it('should call partners service with argument provided', function() {
          spyOn(projectPartnersService, 'find').and.returnValue(RSVP.Promise.resolve());

          var fakeCriteria = {
            projectId: '6'
          };

          this.view.onFindRequest(fakeCriteria);

          expect(projectPartnersService.find).toHaveBeenCalledWith(fakeCriteria);
        });

        it('should call success method after find done', function(done) {
          spyOn(projectPartnersService, 'find').and.returnValue(RSVP.Promise.resolve('success'));

          this.view.didFindSucceed = function(data) {
            expect(data).toEqual('success');
            done();
          }

          this.view.onFindRequest({});
        });

        it('should call failure method after search failed', function(done) {
          spyOn(projectPartnersService, 'find').and.returnValue(RSVP.Promise.reject('error'));

          this.view.didFindFail = function(error) {
            expect(error).toEqual('error');
            done();
          }

          this.view.onFindRequest({});
        });
      });

      describe('.didFindSucceed()', function() {
        beforeEach(function() {
          this.fakePreparedMarkersData = {},
          this.view = new PartnersMapView;

          spyOn(PartnersMapView.prototype, 'prepareMarkersData').and.returnValue(this.fakePreparedMarkersData)
          spyOn(this.view.mapComponent, 'showMarkers');
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.didFindSucceed).toEqual(jasmine.any(Function));
        });

        it('should update map component with prepared markers data', function() {
          var fakeData = {};

          this.view.didFindSucceed(fakeData);
          expect(this.view.prepareMarkersData).toHaveBeenCalledWith(fakeData);
        });

        it('should show markers on map component', function() {
          this.view.didFindSucceed();
          expect(this.view.mapComponent.showMarkers).toHaveBeenCalledWith(this.fakePreparedMarkersData);
        });
      });

      describe('.didSearchFail()', function() {
        it('should be defined', function() {
          expect(PartnersMapView.prototype.didFindFail).toEqual(jasmine.any(Function));
        });

        it('should show error message', function() {
          spyOn(app, 'showError');

          var view = new PartnersMapView,
            fakeError = {};

          view.didFindFail(fakeError);

          expect(app.showError).toHaveBeenCalledWith(fakeError);
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

        it('should have partners as first cluster group', function() {
          var partner = {},
            fakePartnerMapMarker = {};

          spyOn(PartnersMapView.prototype, 'toMapMarker').and.callFake(function(markerData, color) {
            if (markerData === partner && color === undefined) {
              return fakePartnerMapMarker
            }
          });

          var markersData = this.view.prepareMarkersData({
            partners: [partner]
          });

          expect(markersData.markers[0][0]).toBe(fakePartnerMapMarker)
        });

        it('should have coordinator as second cluster group', function() {
          var coordinator = {},
            fakeCoordinatorMapMarker = {};

          spyOn(PartnersMapView.prototype, 'toMapMarker').and.callFake(function(markerData, color) {
            if (markerData === coordinator && color === 'blue') {
              return fakeCoordinatorMapMarker
            }
          });

          var markersData = this.view.prepareMarkersData({
            coordinator: coordinator
          });

          expect(markersData.markers[1][0]).toBe(fakeCoordinatorMapMarker)
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
          expect(mapMarker.color).toEqual('blue');
          expect(mapMarker.popupContent.outerHTML).toEqual(popupContent.outerHTML);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('efc.project-partners-page.fixture.html');

          this.view = new PartnersMapView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render partners map component to appropriate container', function() {
          var markup = this.view.mapComponent.render().view.el;
          expect($('.efc-project-partners-container')).toContainHtml(markup);
        });
      });
    });
  });
});