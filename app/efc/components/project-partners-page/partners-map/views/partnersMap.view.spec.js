define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    PartnersMapView = require('./partnersMap.view'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
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
        spyOn(PartnersMapView.prototype, 'render');
        spyOn(PartnersMapView.prototype, 'requestInitialSearch');
        spyOn(MapComponent.prototype, 'initMap');

        this.fakeCriteria = {
          id: '6'
        };

        this.view = new PartnersMapView(this.fakeCriteria);
      });

      it('should have map component defined', function() {
        expect(this.view.mapComponent).toEqual(jasmine.any(MapComponent));
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

          var fakeProjectId = '6';

          this.view.onFindRequest(fakeProjectId);

          expect(projectPartnersService.find).toHaveBeenCalledWith(fakeProjectId);
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