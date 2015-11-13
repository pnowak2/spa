define(function(require) {
  var Backbone = require('backbone'),
    PagedResultsListView = require('./pagedResultsList.view'),
    ResultsListComponent = require('app/efc/components/results/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component');

  describe('Paged Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagedResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should have results list component defined', function() {
        var view = new PagedResultsListView;
        expect(view.resultsListComponent).toEqual(jasmine.any(ResultsListComponent));
      });

      it('should have pager component defined', function() {
        var view = new PagedResultsListView;
        expect(view.pagerComponent).toEqual(jasmine.any(PagerComponent));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(PagedResultsListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(PagedResultsListView.prototype.className).toEqual('efc-paged-results-list');
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should append results list component', function() {
          var view = new PagedResultsListView;

          view.render();

          expect(view.$el).toContainHtml(view.resultsListComponent.render().view.$el.html());
        });

        it('should append pager component', function() {
          var view = new PagedResultsListView;

          view.render();

          expect(view.$el).toContainHtml(view.pagerComponent.render().view.$el.html());
        });
      });
    });
  });
});