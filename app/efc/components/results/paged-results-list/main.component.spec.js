define(function(require) {
  var Component = require('app/core/component'),
    PagedResultsListComponent = require('./main.component'),
    PagedResultsListView = require('./views/pagedResultsList.view');

  describe('Paged Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PagedResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new PagedResultsListComponent;
        expect(component.view).toEqual(jasmine.any(PagedResultsListView));
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

          spyOn(component.view.pagerComponent, 'getState').and.returnValue(fakeState);

          pagerState = component.getPagerState();

          expect(pagerState).toBe(fakeState);
        });
      });

      describe('.update()', function() {
        beforeEach(function() {
          this.component = new PagedResultsListComponent;
          this.fakeData = {
            total: 5,
            items: []
          };
        });

        it('should be defined', function() {
          expect(PagedResultsListComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without data', function() {
          var self = this;
          expect(function() {
            self.component.update();
          }).not.toThrow();
        });

        it('should update results list component', function() {
          var updateSpy = spyOn(this.component.view.resultsListComponent, 'update')

          this.component.update(this.fakeData);

          expect(updateSpy).toHaveBeenCalledWith(this.fakeData.items);
          expect(updateSpy.calls.mostRecent().args[0])
            .toBe(this.fakeData.items);
        });

        it('should update pager component', function() {
          var updateSpy = spyOn(this.component.view.pagerComponent, 'update')

          this.component.update(this.fakeData);

          expect(updateSpy).toHaveBeenCalledWith({
            totalItems: 5
          });
        });
      });
    });
  });
});