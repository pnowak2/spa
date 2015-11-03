define(function(require) {
  var $ = require('jquery'),
    Module = require('app/core/module'),
    Backbone = require('backbone'),
    Router = require('app/routers/router'),
    AppModule = Module.extend({
      initialize: function() {
        this._initializeAjaxEvents();
      },

      _initializeAjaxEvents: function() {
        var self = this;
        $(document)
          .ajaxStart(function() {
            self.trigger('app:ajax:start');
          })
          .ajaxStop(function() {
            self.trigger('app:ajax:stop');
          })
          .ajaxError(function(event, jqxhr, settings, thrownError) {
            self.trigger('app:ajax:error', event, jqxhr, settings, thrownError);
          });
      },

      showInfo: function(message) {},

      showWarning: function(message) {},

      showError: function(message) {}
    }),
    appModule = new AppModule,
    router = new Router;

  router.app = appModule;
  Backbone.history.start();

  return appModule;
});