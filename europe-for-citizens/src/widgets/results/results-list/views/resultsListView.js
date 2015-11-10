define(function(require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    ResultItemView = require('./resultItemView'),
    ResultsCollection = require('../collections/resultsCollection'),
    tpl = require('text!../templates/results-list.html');

  return Backbone.View.extend({
    className: 'efc-results-list',

    initialize: function() {
      this.collection = new ResultsCollection;
      this.listenTo(this.collection, 'reset', this.render);
    },

    update: function(data) {
      this.collection.reset(data);
    },

    createResultItemViews: function() {
      // return this.collection.map(function(resultModel) {
      //   return new ResultItemView({
      //     model: resultModel
      //   });
      // });
    },

    getTableBodyContainer: function() {
      return this.$el.find('tbody');
    },

    render: function() {
      this.$el.html(Mustache.render(tpl));

      var tableBody = this.getTableBodyContainer(),
        resultItemViews = this.createResultItemViews();

      _.each(resultItemViews, function(resultItemView) {
        tableBody.append(resultItemView.render().el);
      });

      return this;
    }
  });
});