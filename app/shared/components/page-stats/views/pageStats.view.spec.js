define(function(require) {
  var _ = require('underscore'),
    PageStatsView = require('./pageStats.view'),
    PageStatsModel = require('../models/pageStats.model');

  describe('Page Stats View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PageStatsView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.className should be defined', function() {
        expect(PageStatsView.prototype.className).toEqual('efc-page-stats');
      });
    });

    describe('creation', function() {
      it('should have default model', function() {
        var view = new PageStatsView;
        expect(view.model).toEqual(jasmine.any(PageStatsModel));
      });

      it('should bind view methods', function() {
        spyOn(_, 'bindAll');

        var view = new PageStatsView;

        expect(_.bindAll).toHaveBeenCalledWith(view, 'render');
      });

      it('should have model initialized with options', function() {
        spyOn(PageStatsModel.prototype, 'initialize');

        var fakeOptions = {},
          view = new PageStatsView(fakeOptions);

        expect(view.model.initialize).toHaveBeenCalledWith(fakeOptions);
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(PageStatsView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to model', function() {
          spyOn(PageStatsModel.prototype, 'update');

          var fakeOptions = {},
            view = new PageStatsView;

          view.update(fakeOptions);

          expect(view.model.update).toHaveBeenCalledWith(fakeOptions);

        });
      });
    });

    describe('events', function() {
      it('should rerender after model changes', function(done) {
        spyOn(PageStatsView.prototype, 'render').and.callFake(function() {
          expect(true).toBe(true);
          done();
        });

        var view = new PageStatsView;
        view.model.trigger('change');
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new PageStatsView({
            displayStartItem: 11,
            displayEndItem: 20,
            totalItems: 162
          });
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should', function() {
          var el = this.view.render().el;

          expect(el).toContainText('Showing 11 to 20 of 162 entries');

          this.view.update({
            displayStartItem: 21,
            displayEndItem: 30,
            totalItems: 222
          });

          expect(el).toContainText('Showing 21 to 30 of 222 entries');
        });
      });
    });
  });
});