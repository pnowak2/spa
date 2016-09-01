define(function(require) {
  var Backbone = require('backbone'),
    efcRouter = require('./landing-page.router');

  describe('CE Landing Page Router', function() {
    beforeEach(function() {
      spyOn(efcRouter, 'trigger');

      try {
        Backbone.history.start();
      } catch (e) {}
    });

    afterEach(function() {
      efcRouter.navigate('');
      efcRouter.trigger.calls.reset();
      Backbone.history.stop();
    });

    describe('type', function() {
      it('should be of router', function() {
        expect(efcRouter).toEqual(jasmine.any(Backbone.Router));
      });
    });

    describe('routes', function() {
      it('searching by keyword should trigger router event', function() {
        efcRouter.navigate('ce/keyword/bar', {
          trigger: true
        });

        expect(efcRouter.trigger).toHaveBeenCalledWith('route:search:keyword', 'bar');
      });
    });
  });
});