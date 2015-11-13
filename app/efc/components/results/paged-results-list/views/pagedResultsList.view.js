define(function(require) {
  var Backbone = require('backbone'),
    ResultsListComponent = require('app/efc/components/results/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component');

  return Backbone.View.extend({
    className: 'efc-paged-results-list',

    initialize: function() {
      this.resultsListComponent = new ResultsListComponent;
      this.pagerComponent = new PagerComponent;
    },

    render: function() {
      this.$el.append(this.resultsListComponent.render().view.el);
      this.$el.append(this.pagerComponent.render().view.el);

      return this;
    }
  })
});