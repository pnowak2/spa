define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    PartnersMapView = require('./partnersMap.view'),
    PartnersMapComponent = require('app/shared/components/mapping/partners-map/main.component'),
    projectPartnersService = require('../services/projectPartners.service'),
    RSVP = require('rsvp'),
    app = require('app/shared/modules/app.module');

  describe('EfC Project Partners Map View', function() {
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
        spyOn(PartnersMapComponent.prototype, 'initialize');
        spyOn(PartnersMapComponent.prototype, 'initMap');

        this.fakeCriteria = {
          id: '6'
        };

        this.view = new PartnersMapView(this.fakeCriteria);
      });

      it('should bind callback methods with view object', function() {
        expect(_.bindAll).toHaveBeenCalledWith(this.view, 'didFindSucceed', 'didFindFail');
      });

      it('should have map component defined', function() {
        expect(this.view.partnersMapComponent).toEqual(jasmine.any(PartnersMapComponent));
      });

      it('should initialize map component with proper options', function() {
        expect(this.view.partnersMapComponent.initialize).toHaveBeenCalled();
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the map', function() {
        expect(this.view.partnersMapComponent.initMap).toHaveBeenCalled();
      });

      it('should perform initial request', function() {
        expect(this.view.requestInitialSearch).toHaveBeenCalledWith(this.fakeCriteria);
      });
    });

    describe('api', function() {
      describe('.requestInitialSearch()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.requestInitialSearch).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without args', function() {
          var self = this;
          expect(function() {
            self.view.requestInitialSearch();
          }).not.toThrow();
        });

        it('should call partners service with argument provided', function() {
          spyOn(projectPartnersService, 'find').and.returnValue(RSVP.Promise.resolve());

          var fakeCriteria = {
            projectId: '6'
          };

          this.view.requestInitialSearch(fakeCriteria);

          expect(projectPartnersService.find).toHaveBeenCalledWith(fakeCriteria);
        });

        it('should call success method after find done', function(done) {
          spyOn(projectPartnersService, 'find').and.returnValue(RSVP.Promise.resolve('success'));

          this.view.didFindSucceed = function(data) {
            expect(data).toEqual('success');
            done();
          }

          this.view.requestInitialSearch({});
        });

        it('should call failure method after search failed', function(done) {
          spyOn(projectPartnersService, 'find').and.returnValue(RSVP.Promise.reject('error'));

          this.view.didFindFail = function(error) {
            expect(error).toEqual('error');
            done();
          }

          this.view.requestInitialSearch({});
        });
      });

      describe('.didFindSucceed()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
        });

        it('should be defined', function() {
          expect(PartnersMapView.prototype.didFindSucceed).toEqual(jasmine.any(Function));
        });

        it('should show markers with partners map component', function() {
          spyOn(PartnersMapComponent.prototype, 'showMarkers');

          var fakeData = {};
          this.view.didFindSucceed(fakeData);

          expect(this.view.partnersMapComponent.showMarkers).toHaveBeenCalledWith(fakeData);
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
          var markup = this.view.partnersMapComponent.render().view.el;
          expect($('.efc-project-partners-container')).toContainHtml(markup);
        });
      });
    });
  });
});