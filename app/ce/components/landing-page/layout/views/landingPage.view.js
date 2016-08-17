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
      //   programme: '31052583',
      //   subprogramme: '31052594',
      //   action: '31061522',
      //   activities: ['31052658', '31052660'],
      //   activityYears: ['2012', '2013'],
      //   fundingYears: ['2014', '2015'],
      //   matchAllCountries: true,
      //   countries: ['PL', 'BE'],
      //   regions: ['31046918'],
      //   organisationTypes: ['31047402', '31047384']
      // });
    },

    render: function() {
      $('.ce-search-container').append(this.search.render().view.el);

      return this;
    }
  });
});