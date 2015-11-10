define(function(require) {
  var Backbone = require('backbone'),
    ResultsCollection = require('app/widgets/results/results-list/collections/resultsCollection'),
    ResultModel = require('app/widgets/results/results-list/models/resultModel');

  describe('Results List Collection', function() {
    describe('type', function() {
      it('should be of colleciton', function() {
        expect(ResultsCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });

      it('should have proper model defined', function() {
        expect(ResultsCollection.prototype.model).toEqual(ResultModel);
      });
    });
  });
});