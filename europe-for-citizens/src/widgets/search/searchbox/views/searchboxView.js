define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchCriteriaModel = require('../models/searchCriteriaModel'),
    widgetEventBus = require('../events/widgetEventBus'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/searchbox.html');

  var ENTER_KEY = 13;

  return Backbone.View.extend({
    className: 'efc-searchbox',

    events: {
      'click button': 'searchButtonClicked',
      'keypress input': 'keyPressed'
    },

    initialize: function() {
      this.model = new SearchCriteriaModel;
    },

    searchButtonClicked: function() {
      this.performSearch();
    },

    keyPressed: function(e) {
      if (e.which === ENTER_KEY) {
        e.preventDefault();
        this.performSearch();
      }
    },

    performSearch: function() {
      var isValid = this.model.set('keyword', this.keywordInput.val(), {
        validate: true
      });
      if (isValid) {
        widgetEventBus.trigger('searchbox:keyword', this.model.toJSON());
      }
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);
      this.keywordInput = this.$el.find('input');

      return this;
    }
  });
});