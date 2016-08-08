define(function(require) {
  var Module = require('./module');

  return Module.extend({
    view: null,

    render: function() {
      this.view.render();
      return this;
    },

    hide: function() {
      this.view.$el.hide();
      return this;
    },

    show: function() {
      this.view.$el.show();
      return this;
    },

    toggle: function() {
      this.view.$el.toggle();
      return this;
    }
  });
});