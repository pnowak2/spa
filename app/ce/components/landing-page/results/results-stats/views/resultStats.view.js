define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/result-stats.tpl.html');

  return Backbone.View.extend({
    className: 'ce-result-stats',

    initialize: function() {
      this.data = {};
    },

    events: {
      'click .ce-result-stats__export-xls': 'didClickExportXls'
    },

    didClickExportXls: function(evt) {
      evt.preventDefault();
      this.trigger('export:xls');
    },

    update: function(data) {
      this.data = data || {};
      this.render();
    },

    shouldShowKeyword: function(data) {
      data.criteria = data.criteria || {};

      var isAdvancedSearchEmpty = _.chain(data.criteria)
        .omit('keyword')
        .values()
        .every(function(criteriaValue) {
          return _.isEmpty(criteriaValue);
        })
        .value();

      return !_.isEmpty(data.criteria.keyword) && isAdvancedSearchEmpty;
    },

    hasItems: function(data) {
      return data.itemsCount > 0;
    },

    render: function() {
      var html = Mustache.render(tpl, _.extend(this.data, {
        hasItems: this.hasItems(this.data),
        showKeyword: this.shouldShowKeyword(this.data)
      }));

      this.$el.html(html);

      return this;
    }
  });
});