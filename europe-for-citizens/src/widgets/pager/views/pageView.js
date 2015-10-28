define(function (require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    widgetEventBus = require('../events/widgetEventBus');

  return Backbone.View.extend({
    tagName: 'a',

    attributes: { href: '#' },

    events: {
      'click': 'didClickPageNumber'
    },

    initialize: function () {
      this.listenTo(this.model, 'change:selected', this.selectionChanged);
    },

    didClickPageNumber: function (e) {
      e.preventDefault();
      this.model.select();
    },

    selectionChanged: function () {
      if (this.model.isSelected()) {
        widgetEventBus.trigger('pager:page-request', this.model);
      }
      this.$el.toggleClass('efc-page-selected', this.model.isSelected());
    },

    render: function () {
      var html = Mustache.render('{{ page }}', this.model.toJSON());
      this.$el.html(html);
      this.$el.toggleClass('efc-page-selected', this.model.isSelected());

      return this;
    }
  });
});