define(function(require) {
  var Widget = require('app/core/widget'),
    ResultsListWidget = require('app/widgets/results/results-list/main'),
    ResultsListView = require('app/widgets/results/results-list/views/resultsListView');

  describe('Results List Widget', function() {
    describe('type', function() {
      it('should be of widget', function() {
        expect(ResultsListWidget.prototype).toEqual(jasmine.any(Widget));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var widget = new ResultsListWidget;
        expect(widget.view).toEqual(jasmine.any(ResultsListView));
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultsListWidget.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should update view with passed data', function() {
          var widget = new ResultsListWidget,
            fakeData = {};
          spyOn(widget.view, 'update');

          widget.update(fakeData);

          expect(widget.view.update).toHaveBeenCalled();
          expect(widget.view.update.calls.mostRecent().args[0]).toBe(fakeData);
        });
      });
    });
  });
});