define(function(require) {
  var Backbone = require('backbone'),
    ResultsListComponent = require('app/efc/components/results/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component');

  return Backbone.View.extend({
    className: 'efc-paged-results-list',

    initialize: function(attrs) {
      attrs = attrs || {};

      if (!(attrs.resultsListComponent instanceof ResultsListComponent)) {
        throw new Error('Result list component is not correct');
      }

      if (!(attrs.pagerComponent instanceof PagerComponent)) {
        throw new Error('Pager component is not correct');
      }

      this.resultsListComponent = attrs.resultsListComponent;
      this.pagerComponent = attrs.pagerComponent;
    },

    render: function() {
      this.$el.append(this.resultsListComponent.render().view.el);
      this.$el.append(this.pagerComponent.render().view.el);

      return this;
    }
  })
});