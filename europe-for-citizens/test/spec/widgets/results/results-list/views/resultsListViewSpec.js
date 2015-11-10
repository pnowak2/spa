define(function(require) {
  var Backbone = require('backbone'),
    ResultsListView = require('app/widgets/results/results-list/views/resultsListView');

  describe('Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(ResultsListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.className).toEqual('efc-results-list');
        });
      });
    });

    describe('creation', function() {
      it('should have default collection defined', function() {
        var view = new ResultsListView;
        expect(view.collection).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should reset collection with passed data', function() {
          var view = new ResultsListView,
            fakeData = {};

          spyOn(view.collection, 'reset');

          view.update(fakeData);

          expect(view.collection.reset).toHaveBeenCalledWith(fakeData);
        });
      });

      describe('.createResultItemViews()', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.createResultItemViews).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});