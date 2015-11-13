define(function(require) {
  var Component = require('app/core/component'),
    PagedResultsListComponent = require('./main.component'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component'),
    PagedResultsListView = require('./views/pagedResultsList.view');

  describe('Paged Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PagedResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(PagedResultsListView.prototype, 'initialize');
        spyOn(PagerComponent.prototype, 'initialize');
        spyOn(ResultsListComponent.prototype, 'initialize');
        this.fakeOptions = {};
        this.component = new PagedResultsListComponent(this.fakeOptions);
      });

      it('should have results list component defined', function() {
        expect(this.component.resultsListComponent).toEqual(jasmine.any(ResultsListComponent));
      });

      it('should have pager component defined', function() {
        expect(this.component.pagerComponent).toEqual(jasmine.any(PagerComponent));
      });

      it('should be initialized with proper view', function() {
        expect(this.component.view).toEqual(jasmine.any(PagedResultsListView));
      });

      it('should initialize view with list and pager components', function() {
        expect(this.component.view.initialize).toHaveBeenCalledWith({
          resultsListComponent: this.component.resultsListComponent,
          pagerComponent: this.component.pagerComponent
        });
      });

      it('should initialize results list component with options', function() {
        expect(this.component.resultsListComponent.initialize).toHaveBeenCalledWith(this.fakeOptions);
      });

      it('should initialize pager component with options', function() {
        expect(this.component.pagerComponent.initialize).toHaveBeenCalledWith(this.fakeOptions);
      });
    });

    describe('api', function() {
      describe('.getPagerState()', function() {
        it('should be defined', function() {
          expect(PagedResultsListComponent.prototype.getPagerState).toEqual(jasmine.any(Function));
        });

        it('should delegate to pager component', function() {
          var component = new PagedResultsListComponent,
            fakeState = {},
            pagerState;

          spyOn(component.pagerComponent, 'getState').and.returnValue(fakeState);

          pagerState = component.getPagerState();

          expect(pagerState).toBe(fakeState);
        });
      });

      describe('.update()', function() {
        it('should be defined', function() {
          expect(PagedResultsListComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new PagedResultsListComponent
          spyOn(component.view, 'update');

          var fakeData = {};

          component.update(fakeData);

          expect(component.view.update).toHaveBeenCalledWith(fakeData);
        });
      });
    });

    describe('events', function() {
      it('should retrigger events from results list component', function() {
        spyOn(PagedResultsListComponent.prototype, 'trigger');
        var component = new PagedResultsListComponent;

        component.resultsListComponent.trigger('foo', 'bar');

        expect(component.trigger).toHaveBeenCalledWith('foo', 'bar');
      });

      it('should retrigger events from pager component', function() {
        spyOn(PagedResultsListComponent.prototype, 'trigger');
        var component = new PagedResultsListComponent;

        component.pagerComponent.trigger('foo', 'bar');

        expect(component.trigger).toHaveBeenCalledWith('foo', 'bar');
      });
    });
  });
});