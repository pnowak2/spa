define(function (require) {
  var $ = require('jquery'),
    _ = require('underscore'),
    notificationsMixin = require('app/mixins/notifications'),
    Module = require('app/core/module'),
    Backbone = require('backbone'),
    Router = require('app/routers/router'),

    AppModule = Module.extend({
      initialize: function () {
        var self = this;
        $(document)
          .ajaxStart(function () {
            self.trigger('app:ajax:start');
          }).ajaxStop(function () {
            self.trigger('app:ajax:stop');
          }).ajaxError(function (event, jqxhr, settings, thrownError) {
            self.trigger('app:ajax:error', event, jqxhr, settings, thrownError);
          });
      },

      router: new Router()
    }),

    appModule = new AppModule;
    appModule.router.app = appModule;

  _.extend(AppModule.prototype, notificationsMixin);
    Backbone.history.start();

  return appModule;
});