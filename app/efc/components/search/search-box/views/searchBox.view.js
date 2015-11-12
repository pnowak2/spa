define(function(require) {
  var Backbone = require('backbone'),
    constants = require('app/shared/util/constants'),
    Mustache = require('mustache'),
    SearchBoxModel = require('../models/searchBox.model'),
    tpl = require('text!../templates/searchbox.tpl.html');

  return Backbone.View.extend({
    className: 'efc-searchbox',

    events: {
      'click button': 'didClickSearchButton',
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

    didPressKey: function(e) {
      if (e.which === constants.keys.ENTER) {
        e.preventDefault();
        this.requestSearch();
      }
    },

    didModelChange: function() {
      this.trigger('search:keyword', this.model.toJSON())
    },

    getFormData: function() {
      return {
        keyword: this.keywordInput.val()
      }
    },

    requestSearch: function() {
      this.model.set(this.getFormData());
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);
      this.keywordInput = this.$el.find('input');

      return this;
    }
  });
});