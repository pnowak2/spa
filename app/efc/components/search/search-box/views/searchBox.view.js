define(function(require) {
  var Backbone = require('backbone'),
    constants = require('app/shared/util/constants'),
    Mustache = require('mustache'),
    SearchBoxModel = require('../models/searchBox.model'),
    tpl = require('text!../templates/searchBox.tpl.html');

  return Backbone.View.extend({
    className: 'efc-searchbox',

    events: {
      'click button.efc-btn-search': 'didClickSearchButton',
      'click button.efc-btn-more': 'didClickMoreButton',
      'keypress input': 'didPressKey'
    },

    initialize: function() {
      this.model = new SearchBoxModel;
      this.listenTo(this.model, 'change', this.didModelChange);
    },

    didClickSearchButton: function(e) {
      e.preventDefault();
      this.requestSearch();
    },

    didClickMoreButton: function(e) {
      e.preventDefault();
      this.trigger('search:more');
    },

    didPressKey: function(e) {
      if (e.which === constants.keys.ENTER) {
        e.preventDefault();
        this.requestSearch();
      }
    },

    getFormData: function() {
      return {
        keyword: this.keywordInput.val()
      }
    },

    requestSearch: function() {
      this.model.set(this.getFormData());
      this.trigger('search:keyword', this.model.toJSON())
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);
      this.keywordInput = this.$el.find('input');

      return this;
    }
  });
});