define(function(require) {
  var Backbone = require('backbone'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component'),
    advancedSearchService = require('../services/advanced-search/advancedSearch.service'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/advancedSearch.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-advanced-search',

    events: {
      'click a.vlr-advanced-search__clear': 'didClickClearFilters'
    },

    initialize: function() {

    },

    getCriteria: function() {

    },

    hasSelections: function() {
      
    },

    didClickClearFilters: function(e) {

    },

    render: function() {
      var html = Mustache.render(tpl);

      this.$el.html(html);
      
      return this;
    }
  });
});