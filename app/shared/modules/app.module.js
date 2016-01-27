define(function(require) {
  var $ = require('jquery'),
    blockUI = require('blockUI'),
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
          self.blockUI();
        })
        .ajaxStop(function() {
          self.unblockUI();
        })
        .ajaxError(function(event, jqxhr, settings, thrownError) {
          self.unblockUI();
        });
    },

    showInfo: function(message) {},

    showWarning: function(message) {},

    showError: function(message) {},

    blockUI: function() {
      Backbone.$.blockUI();
    },

    unblockUI: function() {
      Backbone.$.unblockUI();
    }
  });

  return new AppModule;
});