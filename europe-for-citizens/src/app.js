define(function(require) {
  var $ = require('jquery'),
    Module = require('app/core/module'),
    Backbone = require('backbone'),
    AppRouter = require('app/routers/appRouter'),
    AppModule = Module.extend({
      initialize: function() {
        this.appRouter = new AppRouter;
        this.appRouter.app = this;
        this.initializeAjaxEvents();

        Backbone.history.start();
      },

      initializeAjaxEvents: function() {
        var self = this;
        $(document)
          .ajaxStart(function() {
            self.trigger('app:ajax:start');
          })
          .ajaxStop(function() {
            self.trigger('app:ajax:stop');
          })
          .ajaxError(function(event, jqxhr, settings, thrownError) {
            self.trigger('app:ajax:error', thrownError);
          });
      },

      showInfo: function(message) {},

      showWarning: function(message) {},

      showError: function(message) {}
    }),

    appModule = new AppModule;

  return appModule;
});