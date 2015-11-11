define(function(require) {
  var app = require('app/app'),
    Module = require('app/core/module'),
    AppRouter = require('app/routers/appRouter'),
    Backbone = require('backbone'),
    $ = require('jquery');

  describe('App Module', function() {
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

    describe('properties', function() {
      describe('.appRouter', function() {
        it('should be defined', function() {
          expect(app.appRouter).toEqual(jasmine.any(AppRouter));
        });
      });
    });

    describe('api', function() {
      describe('.didExecuteRoute()', function() {
        it('should be defined', function() {
          expect(app.didExecuteRoute).toEqual(jasmine.any(Function));
        });

        it('should trigger app event', function() {
          spyOn(app, 'trigger');

          app.didExecuteRoute('routename', {
            foo: 'bar'
          });

          expect(app.trigger).toHaveBeenCalledWith('routename', {
            foo: 'bar'
          });
        });
      });

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

      describe('routing', function() {
        it('should listen to router event', function() {
          spyOn(app, 'didExecuteRoute');
          spyOn(app, 'initializeAjaxEvents');
          spyOn(Backbone.history, 'start');

          app.initialize();

          app.appRouter.trigger('routed', 'eventname', {
            foo: 'bar'
          });

          expect(app.didExecuteRoute).toHaveBeenCalledWith('eventname', {
            foo: 'bar'
          });
        });
      });
    });
  });
});