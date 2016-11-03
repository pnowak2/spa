define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Component = require('app/core/component'),
    SearchBoxComponent = require('app/shared/components/searching/search-box/main.component'),
    DummyAdvancedSearchComponent = require('../components/dummyAdvancedSearch/main.component');

  return Backbone.View.extend({
    className: 'vlr-search',

    initialize: function(options) {
      options = options || {};

      this.searchBox = new SearchBoxComponent();
      this.advancedSearch = options.advancedSearchComponent || new DummyAdvancedSearchComponent();

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

    requestSearch: function() {
      this.searchBox.requestSearch();
    },

    didPressKeyInSearchbox: function() {
      if (this.advancedSearch.isDirty && this.advancedSearch.isDirty()) {
        this.advancedSearch.show();
        this.searchBox.toggleMoreButtonStateToOpened();
      }
    },

    update: function(criteria) {
      criteria = criteria || {};

      this.searchBox.update(criteria);
      if (this.advancedSearch.update) {
        this.advancedSearch.update(criteria);
      }
    },

    render: function() {
      this.$el.append(this.searchBox.render().view.el);
      this.$el.append(this.advancedSearch.render().view.el);

      return this;
    }
  });
});