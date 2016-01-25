define(function(require) {
  var Backbone = require('backbone'),
    constants = require('app/shared/util/constants'),
    Mustache = require('mustache'),
    SearchBoxModel = require('../models/searchBox.model'),
    tpl = require('text!../templates/searchBox.tpl.html');

  return Backbone.View.extend({
    className: 'efc-searchbox',

    events: {
      'click .efc-searchbox__search-button': 'didClickSearchButton',
      'click .efc-searchbox__more-button': 'didClickMoreButton',
      'keypress .efc-searchbox__input': 'didPressKey'
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
      this.toggleMoreButtonState();
      this.trigger('search-box:more');
    },

    didPressKey: function(e) {
      if (e.which === constants.keys.ENTER) {
        e.preventDefault();
        this.requestSearch();
      } else {
        this.trigger('search-box:key-down', e.which);
      }

    },

    toggleMoreButtonStateToClosed: function() {
      this.getMoreButton().removeClass('efc-searchbox__more-button--open');
    },

    toggleMoreButtonState: function() {
      this.getMoreButton().toggleClass('efc-searchbox__more-button--open');
    },

    getMoreButton: function() {
      return this.$el.find('.efc-searchbox__more-button');
    },

    getFormData: function() {
      return {
        keyword: this.keywordInput.val()
      }
    },

    requestSearch: function() {
      this.model.set(this.getFormData());
      this.toggleMoreButtonStateToClosed();
      this.trigger('search-box:search', this.model.toJSON())
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);
      this.keywordInput = this.$el.find('input');

      return this;
    }
  });
});