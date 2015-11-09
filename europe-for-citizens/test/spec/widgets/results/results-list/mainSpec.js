define(function(require) {
  var Widget = require('app/core/widget'),
    ResultsListWidget = require('app/widgets/results/results-list/main');

  describe('Results List Widget', function() {
    describe('type', function() {
      it('should be of widget', function() {
        expect(ResultsListWidget.prototype).toEqual(jasmine.any(Widget));
      });
    });
  });
});