define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    PageableResultsListComponent = require('app/ce/components/landing-page/results/list/pageable-results-list/main.component'),
    ProjectItemComponent = require('app/shared/components/project-item/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent
      });
      this.pageableResultsList = new PageableResultsListComponent;
      this.projectItem = new ProjectItemComponent({
        data: {
          id: 'id-1',
          title: 'Project Title',
          description: 'Project Description',
          startYear: '2012',
          countries: ['PL', 'BE'],
          goodPractice: true,
          successStory: true
        }
      });
      this.render();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);

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

    onSearchRequest: function(criteria) {
      this.pageableResultsList.onSearchRequest(criteria);
    },

    render: function() {
      $('.ce-search-container').append(this.search.render().view.el);
      $('.ce-results-container').append(this.pageableResultsList.render().view.el);
      $('.ce-results-container').append(this.projectItem.render().view.el);

      return this;
    }
  });
});