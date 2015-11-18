define(function(require) {
  var Component = require('app/core/component'),
    countries = require('app/efc/components/search/advanced-search/datasource/countries'),
    AdvancedSearchView = require('./views/advancedSearch.view');

  return Component.extend({
    initialize: function(data) {
      this.view = new AdvancedSearchView(data);
    }
  });
});