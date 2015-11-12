define(function(require) {
  var $ = require('jquery'),
    Module = require('app/core/module'),
    Backbone = require('backbone');

  AppModule = Module.extend({
    initialize: function() {
      this.initializeAjaxEvents();
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
  });

  return new AppModule;
});