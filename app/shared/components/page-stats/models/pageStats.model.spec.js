define(function(require) {
  var Backbone = require('backbone'),
    PageStatsModel = require('./pageStats.model');

  describe('Page Stats Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(PageStatsModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('creation', function() {
      it('should have proper defaults defined', function() {
        expect(PageStatsModel.prototype.defaults).toEqual({
          displayStartItem: 0,
          displayEndItem: 0,
          totalItems: 0
        });
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(PageStatsModel.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should update model attributes with passed options', function() {
          var options = {
              displayStartItem: 11,
              displayEndItem: 20,
              totalItems: 2000
            },
            model = new PageStatsModel;

          expect(model.toJSON()).toEqual(model.defaults);

          model.update(options);

          expect(model.toJSON()).toEqual({
            displayStartItem: 11,
            displayEndItem: 20,
            totalItems: 2000
          });
        });
      });
    });
  });
});