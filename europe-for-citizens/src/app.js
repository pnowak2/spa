define(function(require) {
  var $ = require('jquery'),
    Module = require('app/core/module'),
    Backbone = require('backbone'),
    AppRouter = require('app/routers/appRouter'),

    AppModule = Module.extend({
      initialize: function() {
        this.initializeAjaxEvents();
        this.appRouter = new AppRouter;
        this.listenTo(this.appRouter, 'route:executed', this.didExecuteRoute);
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
    });

  return new AppModule;
});