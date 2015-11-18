define(function(require) {
  var Backbone = require('backbone'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component');
  Mustache = require('mustache'),
  tpl = require('text!../templates/advancedSearch.tpl.html');

  return Backbone.View.extend({
    className: 'efc-advanced-search',

    initialize: function(data) {
      data = data || {};
      this.countrySelectComponent = new MultiselectComponent(data.countries);
    },

    getState: function() {
      return {
        country: _.pluck(this.countrySelectComponent.selectedItems(), 'id')
      }
    },

    render: function() {
      var html = Mustache.render(tpl);
      this.$el.html(html);

      var countryContainer = this.$el.find('#country');
      countryContainer.append(this.countrySelectComponent.render().view.el);
    }
  });
});