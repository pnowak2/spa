define(function (require) {
  var Module = require('./module');

  return Module.extend({
    view: null,

    render: function () {
      this.view.render();
      return this;
    },

    hide: function () {
      this.view.$el.hide();
    },

    show: function () {
      this.view.$el.show();
    },

    remove: function () {
      if (this.view) {
        this.view.remove();
      }
    }
  });
});