define(function(require) {
  var Backbone = require('backbone'),
    ResultStatsView = require('./resultStats.view');

  describe('CE Result Stats View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ResultStatsView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(ResultStatsView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(ResultStatsView.prototype.className).toEqual('ce-result-stats');
        });
      });
    });

    describe('creation', function() {
      it('should have empty data object', function() {
        var view = new ResultStatsView();
        expect(view.data).toEqual({});
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        beforeEach(function() {
          spyOn(ResultStatsView.prototype, 'render');
          this.view = new ResultStatsView();
        });

        it('should be defined', function() {
          expect(ResultStatsView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          var self = this;
          expect(function() {
            self.view.update();
          }).not.toThrow();
        });

        it('should store data to instance variable', function() {
          var fakeData = {};
          this.view.update(fakeData);

          expect(this.view.data).toBe(fakeData);
        });

        it('should rerender the view', function() {
          this.view.update();

          expect(this.view.render).toHaveBeenCalled();
        });
      });

      describe('.didClickExportXls()', function() {
        beforeEach(function() {
          this.evt = jasmine.createSpyObj('e', ['preventDefault']);
          this.view = new ResultStatsView();
        });

        it('should be defined', function() {
          expect(ResultStatsView.prototype.didClickExportXls).toEqual(jasmine.any(Function));
        });

        it('should prevent default', function() {
          this.view.didClickExportXls(this.evt);
          expect(this.evt.preventDefault).toHaveBeenCalled();
        });
      });
    });

    describe('dom', function() {
      it('should be properly defined', function() {
        expect(ResultStatsView.prototype.events).toEqual({
          'click .ce-result-stats__export-xls': 'didClickExportXls'
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ResultStatsView();
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        describe('without data', function() {
          beforeEach(function() {
            this.view = new ResultStatsView();
            this.$el = this.view.render().$el;
          });
        });

        describe('with data', function() {
          beforeEach(function() {
            this.view = new ResultStatsView();
            this.view.render();
            this.view.update();
          });
        });
      });
    });
  });
});