define(function(require) {
  var $ = require('jquery'),
    Module = require('app/core/module'),
    Backbone = require('backbone'),
    AppRouter = require('app/routers/appRouter'),
    AppModule = Module.extend({
      initialize: function() {
        this.initializeAjaxEvents();
        this.appRouter = new AppRouter;
        Backbone.history.start();
      },

      startRouter: function() {
        this.listenTo(this.appRouter, 'routed', this.didExecuteRoute);
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

      didExecuteRoute: function(eventName, param) {
        this.trigger(eventName, param);
      },

      showInfo: function(message) {},

      showWarning: function(message) {},

      showError: function(message) {}
    }),

    appModule = new AppModule;

  return appModule;
});