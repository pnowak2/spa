define(function(require) {
  var Backbone = require('backbone'),
    ResultsListView = require('./resultsList.view');

  describe('CE Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {

    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(ResultsListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.className).toEqual('ce-results-list');
        });
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.update).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ResultsListView();
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        describe('without data', function() {
          beforeEach(function() {
            this.view = new ResultsListView();
            this.$el = this.view.render().$el;
          });

          it('should render no data placeholder', function() {
            expect(this.$el.find('.ce-results-list__no-data')).toContainText('No results');
          });
        });
      });
    });
  });
});