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
          spyOn(app, 'blockUI');
          spyOn(app, 'unblockUI');
        });
      });
    });
  });
});