define(function(require) {
  var Backbone = require('backbone'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
    PartnersMapView = require('./partnersMap.view');

  describe('Partners Map View', function() {
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
        this.view = new PartnersMapView;
      });

      it('should have map component defined', function() {
        expect(this.view.mapComponent).toEqual(jasmine.any(MapComponent));
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
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new PartnersMapView;
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render map component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.mapComponent.render().view.$el);
        });
      });
    });
  });

});