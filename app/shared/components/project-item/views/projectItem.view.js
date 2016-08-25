define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/projectItem.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-project-item',

    initialize: function(options) {
      options = options || {};

      this.options = _.extend({}, options);
    },

    render: function() {
      var html = Mustache.render(tpl, this.options.data);

      this.$el.html(html);

      return this;
    }
  });
});