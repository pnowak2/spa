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
      this.options = new MultiselectComponent([{id: 1, title: 'Ongoing', selected: true}, {id: 2, title: 'Completed', selected: true}, {id: 3, title: 'Success Stories only'}, {id: 4, title: 'with Results only'}], {
        placeholder: 'All Options',
        multiple: true
      });

      this.programmes = new MultiselectComponent([{id: ''}, {id: 1, title: 'Creative Europe'}, {id: 2, title: 'Culture (2007-2013)'}], {
        placeholder: 'All Programmes',
        multiple: false,
        allowClear: true
      });
    },

    getCriteria: function() {

    },

    hasSelections: function() {
      return this.programmes.hasSelection() ||
        this.options.hasSelection();
    },

    didClickClearFilters: function(e) {
      e.preventDefault();

      this.programmes.unselectAll();
      this.options.unselectAll();
    },

    render: function() {
      var html = Mustache.render(tpl);

      this.$el.html(html);

      this.$el.find('.vlr-advanced-search__section-options').append(this.options.render().view.el);
      this.$el.find('.vlr-advanced-search__section-programme').append(this.programmes.render().view.el);
      
      return this;
    }
  });
});