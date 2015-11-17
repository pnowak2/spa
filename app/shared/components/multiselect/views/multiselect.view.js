define(function(require) {
  var Backbone = require('backbone'),
    MultiSelectCollection = require('../collections/multiselect.collection'),
    tpl = require('text!../templates/multiselect.tpl.html'),
    Mustache = require('mustache'),
    select2 = require('select2');

  return Backbone.View.extend({
    className: 'efc-multiselect',

    initialize: function(items) {
      this.collection = new MultiSelectCollection(items);
      this.listenTo(this.collection, 'reset', this.render);
    },

    selectedItems: function() {
      return this.collection.selected();
    },

    update: function(items) {
      this.collection.reset(items);
    },

    selectElement: function() {
      return this.$el.find('select');
    },

    render: function() {
      var html = Mustache.render(tpl, {
        items: this.collection.toJSON()
      });

      this.$el.html(html);
      this.selectElement().select2();

      return this;
    }
  });
});