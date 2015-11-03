define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    constants = require('app/core/constants'),
    SearchBoxModel = require('../models/searchBoxModel'),
    eventBus = require('../events/eventBus'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/searchbox.html');

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
      if (e.which === constants.dom.keys.ENTER) {
        e.preventDefault();
        this.requestSearch();
      }
    },

    didModelChange: function() {
      eventBus.trigger('search:keyword', this.model.toJSON())
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