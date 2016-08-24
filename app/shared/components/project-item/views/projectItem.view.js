define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    FlagsComponent = require('app/shared/components/flags/main.component'),
    tpl = require('text!../templates/projectItem.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-project-item',

    initialize: function(options) {
      options = options || {};

      this.options = _.extend({}, options);
    },

    render: function() {
      var html = Mustache.render(tpl, this.options.data),
        flagsComponent = new FlagsComponent([{
          code: 'pl',
          fullName: 'Poland'
        }, {
          code: 'de',
          fullName: 'Germany'
        }]);

      this.$el.html(html);

      this.$el.find('.vlr-project-item__countries-container').html(flagsComponent.render().view.el);

      return this;
    }
  });
});