define(function(require) {
  var Backbone = require('backbone'),
    PagedResultsListView = require('./pagedResultsList.view'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component');

  describe('Paged Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagedResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should not throw if properly initialized', function() {
        expect(function() {
          new PagedResultsListView({
            resultsListComponent: new ResultsListComponent,
            pagerComponent: new PagerComponent
          });
        }).not.toThrow();
      });

      it('should have results list component', function() {
        var view = new PagedResultsListView({
          resultsListComponent: new ResultsListComponent,
          pagerComponent: new PagerComponent
        });

        expect(view.resultsListComponent).toEqual(jasmine.any(ResultsListComponent));
      });

      it('should have pager component', function() {
        var view = new PagedResultsListView({
          resultsListComponent: new ResultsListComponent,
          pagerComponent: new PagerComponent
        });

        expect(view.pagerComponent).toEqual(jasmine.any(PagerComponent));
      });

      it('should throw if result list component is not correct', function() {
        expect(function() {
          new PagedResultsListView({
            resultsListComponent: {},
            pagerComponent: new PagerComponent
          });
        }).toThrowError('Result list component is not correct');
      });

      it('should throw if pager component is not correct', function() {
        expect(function() {
          new PagedResultsListView({
            resultsListComponent: new ResultsListComponent,
            pagerComponent: {}
          })
        }).toThrowError('Pager component is not correct');
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
        beforeEach(function() {
          this.view = new PagedResultsListView({
            resultsListComponent: new ResultsListComponent,
            pagerComponent: new PagerComponent
          });
        });

        it('should append results list component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.resultsListComponent.render().view.$el.html());
        });

        it('should append pager component', function() {
          this.view.render();
          expect(this.view.$el).toContainHtml(this.view.pagerComponent.render().view.$el.html());
        });
      });
    });
  });
});