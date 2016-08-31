define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/result-stats.tpl.html');

  return Backbone.View.extend({
    className: 'ce-result-stats',

    initialize: function () {
      this.data = {};
    },

    events: {
      'click .ce-result-stats__export-xls': 'didClickExportXls'
    },

    didClickExportXls: function (evt) {
      evt.preventDefault();
      this.trigger('export:xls');
    },

    update: function(data) {
      this.data = data || {};
      this.render();
    },

    shouldShowKeyword: function (data) {
      return !_.isEmpty(data.keyword) && !data.isAdvancedSearchDirty;
    },

    render: function() {
      var html = Mustache.render(tpl, _.extend(this.data, {
        showKeyword: this.shouldShowKeyword(this.data)
      }));

      this.$el.toggle(this.data.itemsCount > 0);

      this.$el.html(html);

      return this;
    }
  });
});