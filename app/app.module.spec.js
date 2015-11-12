define(function(require) {
  var app = require('./app.module'),
    Module = require('./core/module'),
    Backbone = require('backbone'),
    $ = require('jquery');

  describe('App Module', function() {
    describe('type', function() {
      it('should be of module', function() {
        expect(app).toEqual(jasmine.any(Module));
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
  });
});