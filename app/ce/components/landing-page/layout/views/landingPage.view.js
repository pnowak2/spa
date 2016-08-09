define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component');

  return Backbone.View.extend({
  	initialize: function () {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent
      });

      this.render();
  	},

    render: function() {
      $('.ce-search-container').append(this.search.render().view.el);

      return this;
    }
  });
});