define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    MultiSelectCollection = require('../collections/multiselect.collection'),
    tpl = require('text!../templates/multiselect.tpl.html'),
    Mustache = require('mustache'),
    select2 = require('select2');

  return Backbone.View.extend({
    className: 'efc-multiselect',

    events: {
      'select2:select select': 'didSelectItem',
      'select2:unselect select': 'didUnselectItem'
    },

    initialize: function(items, options) {
      this.options = options || {};
      this.collection = new MultiSelectCollection(items);
      this.listenTo(this.collection, 'reset', this.render);
    },

    didSelectItem: function(e) {
      e = e || {};
      e.params = e.params || {};
      e.params.data = e.params.data || {};

      var itemId = e.params.data.id;
      this.collection.selectItem(itemId);
    },

    didUnselectItem: function(e) {
      e = e || {};
      e.params = e.params || {};
      e.params.data = e.params.data || {};

      var itemId = e.params.data.id;
      this.collection.unselectItem(itemId);
    },

    selectedItems: function() {
      return _.map(this.collection.selectedItems(), function(model) {
        return model.toJSON();
      });
    },

    update: function(items) {
      this.collection.reset(items);
    },

    getSelectElement: function() {
      return this.$el.find('select');
    },

    render: function() {
      var html = Mustache.render(tpl, {
        items: this.collection.toJSON(),
        multiple: this.options.multiple
      });

      this.$el.html(html);
      this.getSelectElement().select2();

      return this;
    }
  });
});