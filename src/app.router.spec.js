define(function(require) {
  var Backbone = require('backbone'),
    AppRouter = require('./app.router');

  describe('Application Router', function() {
    beforeEach(function() {
      spyOn(AppRouter.prototype, 'trigger');

      this.router = new AppRouter;
      try {
        Backbone.history.start();
      } catch (e) {}
    });

    afterEach(function() {
      this.router.navigate('');
      this.router.trigger.calls.reset();
    });

    describe('type', function() {
      it('should be of router', function() {
        expect(AppRouter.prototype).toEqual(jasmine.any(Backbone.Router));
      });
    });

    describe('routes', function() {
      it('searching by keyword should trigger router event', function() {
        this.router.navigate('search/bar', {
          trigger: true
        });

        expect(this.router.trigger).toHaveBeenCalledWith('route:executed', 'app:route:search:keyword', 'bar');
      });
    });
  });
});