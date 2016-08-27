define(function(require) {
  var app = require('./app.module'),
    Module = require('app/core/module'),
    Backbone = require('backbone'),
    $ = require('jquery');

  describe('App Module', function() {
    describe('type', function() {
      it('should be of module', function() {
        expect(app).toEqual(jasmine.any(Module));
      });
    });

    describe('api', function() {
      beforeEach(function() {
        spyOn(Backbone.$, 'blockUI');
        spyOn(Backbone.$, 'unblockUI');
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

      describe('.blockUI()', function() {
        it('should be defined', function() {
          expect(app.blockUI).toEqual(jasmine.any(Function));
        });

        it('should block UI', function() {
          app.blockUI();
          expect(Backbone.$.blockUI).toHaveBeenCalled();
        });
      });

      describe('.unblockUI()', function() {
        it('should be defined', function() {
          expect(app.unblockUI).toEqual(jasmine.any(Function));
        });

        it('should unblock UI', function() {
          app.unblockUI();
          expect(Backbone.$.unblockUI).toHaveBeenCalled();
        });
      });
    });

    describe('events', function() {
      describe('ajax', function() {
        beforeEach(function() {
          jasmine.clock().install();

          spyOn(app, 'blockUI');
          spyOn(app, 'unblockUI');
        });

        afterEach(function() {
          jasmine.clock().uninstall();
        });

        it('should not block UI if ajax activity stops before given time', function() {
          $.event.trigger('ajaxStart');

          expect(app.blockUI).not.toHaveBeenCalled();

          jasmine.clock().tick(790);

          expect(app.blockUI).not.toHaveBeenCalled();

          $.event.trigger('ajaxStop');
          jasmine.clock().tick(100);

          expect(app.blockUI).not.toHaveBeenCalled();
        });

        it('should not block UI if ajax activity gets error before given time', function() {
          $.event.trigger('ajaxStart');

          expect(app.blockUI).not.toHaveBeenCalled();

          jasmine.clock().tick(790);

          expect(app.blockUI).not.toHaveBeenCalled();

          $.event.trigger('ajaxError');
          jasmine.clock().tick(100);

          expect(app.blockUI).not.toHaveBeenCalled();
        });

        it('should block UI if ajax activity is longer than given time', function() {
          $.event.trigger('ajaxStart');

          jasmine.clock().tick(790);

          expect(app.blockUI).not.toHaveBeenCalled();

          jasmine.clock().tick(40);
          $.event.trigger('ajaxStop');

          expect(app.blockUI).toHaveBeenCalled();
        });

        it('should unblock UI when ajax call stops', function() {
          $.event.trigger('ajaxStop');
          expect(app.unblockUI).toHaveBeenCalled();
        });

        it('should unblock UI when ajax call failed', function() {
          $.event.trigger('ajaxError');
          expect(app.unblockUI).toHaveBeenCalled();
        });
      });
    });
  });
});