define(function(require) {
  var Backbone = require('backbone'),
    PageModel = require('../models/pageModel'),
    eventBus = require('../events/eventBus'),
    Mustache = require('mustache');

  return Backbone.View.extend({
    tagName: 'a',

    attributes: {
      href: '#'
    },

    events: {
      'click': 'didClickPage'
    },

    initialize: function(attrs) {
      if (!(this.model instanceof PageModel)) {
        throw new Error('model is not of correct type');
      }
    },

    didClickPage: function(e) {
      e.preventDefault();
      eventBus.trigger('pager:page:selected', this.model.get('page'));
    },

    render: function() {
      var html = Mustache.render('{{ page }}', this.model.toJSON());
      this.$el.toggleClass('efc-selected', this.model.get('selected'));
      this.$el.html(html);

      return this;
    }
  });
});