define(function(require) {
  var app = require('app/app'),
    Module = require('app/core/module'),
    AppRouter = require('app/routers/appRouter'),
    Backbone = require('backbone'),
    $ = require('jquery');

  describe('App', function() {
    describe('type', function() {
      it('should be of module', function() {
        expect(app).toEqual(jasmine.any(Module));
      });
    });

    describe('creation', function() {
      it('should start backbone history', function() {
        spyOn(Backbone.history, 'start');

        app.initialize();

        expect(Backbone.history.start).toHaveBeenCalled();
      });
    });

    describe('events', function() {
      describe('ajax', function() {
        beforeEach(function() {
          spyOn(app, 'trigger');
        });

        it('should trigger app event when ajax call starts', function() {
          $.event.trigger("ajaxStart")
          expect(app.trigger).toHaveBeenCalledWith('app:ajax:start');
        });

        it('should trigger app event when ajax call stops', function() {
          $.event.trigger("ajaxStop")
          expect(app.trigger).toHaveBeenCalledWith('app:ajax:stop');
        });

        it('should trigger app event when ajax call failed', function() {
          var fakeError = {};
          $.event.trigger("ajaxError")
          expect(app.trigger).toHaveBeenCalled();
        });
      });
    });

    describe('properties', function() {
      describe('.router', function() {
        it('should be defined', function() {
          expect(app.appRouter).toEqual(jasmine.any(AppRouter));
        });

        it('should have reference to the app', function() {
          expect(app.appRouter.app).toBe(app);
        });
      });
    });

    describe('api', function() {
      describe('.showInfo()', function() {
        it('should be defined', function() {
          expect(app.showInfo).toEqual(jasmine.any(Function));
        });
      });

      describe('.showWarning()', function() {
        it('should be defined', function() {
          expect(app.showWarning).toEqual(jasmine.any(Function));
        });
      });

      describe('.showError()', function() {
        it('should be defined', function() {
          expect(app.showError).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});