define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent
      });

      this.render();

      // this.search.update({
      //   keyword: 'boo',
      //   options: ['successStoriesOnly', 'resultsOnly'],
      //   programmes: ['31052583'],
      //   subprogrammes: ['31052594'],
      //   actions: ['31061522'],
      //   activities: ['31052658', '31052660'],
      //   activityYears: ['2012', '2013'],
      //   fundingYears: ['2014', '2015'],
      //   countries: ['PL', 'BE'],
      //   regions: ['31046918'],
      //   organisationTypes: ['31047402', '31047384'],
      //   matchAllCountries: true
      // });
    },

    render: function() {
      $('.ce-search-container').append(this.search.render().view.el);

      return this;
    }
  });
});