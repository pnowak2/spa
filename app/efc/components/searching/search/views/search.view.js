define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchBoxComponent = require('app/efc/components/searching/search-box/main.component'),
    AdvancedSearchComponent = require('app/efc/components/searching/advanced-search/main.component');

  return Backbone.View.extend({
    className: 'efc-search',

    initialize: function() {
      this.searchBox = new SearchBoxComponent;
      this.advancedSearch = new AdvancedSearchComponent;

      this.listenTo(this.searchBox, 'search-box:search', this.didRequestSearch);
      this.listenTo(this.searchBox, 'search-box:more', this.didRequestMore);
      this.listenTo(this.searchBox, 'search-box:key-down', this.didPressKeyInSearchbox);
    },

    didRequestSearch: function(searchBoxCriteria) {
      var criteria = _.extend({},
        searchBoxCriteria,
        this.advancedSearch.getCriteria()
      );

      this.advancedSearch.hide();

      this.trigger('search:search', criteria);
    },

    didRequestMore: function() {
      this.advancedSearch.toggle();
    },

    didPressKeyInSearchbox: function() {
      if (this.advancedSearch.hasSelections()) {
        this.advancedSearch.show();
        this.searchBox.toggleMoreButtonStateToOpened();
      }
    },

    render: function() {
      this.$el.append(this.searchBox.render().view.el);
      this.$el.append(this.advancedSearch.render().view.el);

      return this;
    }
  });
});