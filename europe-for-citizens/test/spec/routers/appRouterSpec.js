define(function(require) {
  var Backbone = require('backbone'),
    AppRouter = require('app/routers/appRouter');

  xdescribe('Application Router', function() {
    beforeEach(function() {

      this.router = new AppRouter;

      try {
        Backbone.history.start({
          silent: true,
          pushState: true
        });
      } catch (e) {}

      this.router.app = jasmine.createSpyObj('app', ['trigger']);
    });

    describe('type', function() {
      it('should be of router', function() {
        expect(AppRouter.prototype).toEqual(jasmine.any(Backbone.Router));
      });
    });

    describe('routes', function() {
      it('search/:keyword', function() {
        console.log('app', this.router.app)

        this.router.navigate('search/bar', {
          trigger: true
        });

        expect(this.router.app.trigger).toHaveBeenCalledWith('bar');
      });
    });
  });
});