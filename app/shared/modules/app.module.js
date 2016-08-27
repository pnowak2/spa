define(function(require) {
  var $ = require('jquery'),
    blockUI = require('blockUI'),
    Module = require('app/core/module'),
    Backbone = require('backbone');

  AppModule = Module.extend({
    initialize: function() {
      this.initializeAjaxEvents();
      this.delayedBlockUI = function() {};
    },

    initializeAjaxEvents: function() {
      var self = this;
      $(document)
        .ajaxStart(function() {
          self.delayedBlockUI = window.setTimeout(self.blockUI, 800);
        })
        .ajaxStop(function() {
          window.clearTimeout(self.delayedBlockUI);
          self.unblockUI();
        })
        .ajaxError(function(event, jqxhr, settings, thrownError) {
          window.clearTimeout(self.delayedBlockUI);
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

  return new AppModule();
});