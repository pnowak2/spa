define(function(require) {
  var Backbone = require('backbone'),
    SearchBoxComponent = require('app/efc/components/searching/search-box/main.component'),
    AdvancedSearchComponent = require('app/efc/components/searching/advanced-search/main.component');

  return Backbone.View.extend({
    initialize: function(data) {
      this.searchBox = new SearchBoxComponent(data);
      this.advancedSearch = new AdvancedSearchComponent(data);
    }
  });
});