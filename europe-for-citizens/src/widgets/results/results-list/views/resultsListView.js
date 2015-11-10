define(function(require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    ResultsCollection = require('../collections/resultsCollection'),
    ItemView = require('./resultItemView'),
    tpl = require('text!../templates/results-list.html');

  return Backbone.View.extend({
    className: 'efc-results-table',

    initialize: function() {
      this.collection = new ResultsCollection;
      this.listenTo(this.collection, 'reset', this.render);
    },

    getTableBodyContainer: function() {
      return this.$el.find('tbody');
    },

    createResultItemViews: function() {
      return this.collection.map(function(resultModel) {
        return new ItemView({
          model: resultModel
        });
      });
    },

    update: function(data) {
      this.collection.reset(data);
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