define(function(require) {
  var Backbone = require('backbone'),
    ResultCollection = require('app/widgets/results/results-list/collections/resultCollection'),
    ResultModel = require('app/widgets/results/results-list/models/resultModel');

  describe('Result List Collection', function() {
    describe('type', function() {
      it('should be of colleciton', function() {
        expect(ResultCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });

      it('should have proper model defined', function() {
        expect(ResultCollection.prototype.model).toEqual(ResultModel);
      });
    });
  });
});