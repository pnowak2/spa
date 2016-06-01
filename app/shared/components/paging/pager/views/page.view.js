define(function(require) {
  var Backbone = require('backbone'),
    PageModel = require('../models/page.model'),
    Mustache = require('mustache');

  return Backbone.View.extend({
    tagName: 'a',

    className: 'vlr-pager__page',

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
      this.listenTo(this.model, 'change', this.render);
    },

    didClickPage: function(e) {
      e.preventDefault();
      this.model.trigger('page:selection-request', this.model.get('page'));
    },

    render: function() {
      var html = Mustache.render('{{ page }}', this.model.toJSON());
      this.$el.toggleClass('vlr-pager__page--selected', this.model.get('selected'));
      this.$el.html(html);

      return this;
    }
  });
});