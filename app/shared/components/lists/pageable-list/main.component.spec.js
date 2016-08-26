define(function(require) {
  var Component = require('app/core/component'),
    PageableListComponent = require('./main.component'),
    PageableListView = require('./views/pageableList.view');

  describe('Pageable List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PageableListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new PageableListComponent;
        expect(component.view).toEqual(jasmine.any(PageableListView));
      });

      it('should pass options to its view', function() {
        spyOn(PageableListView.prototype, 'initialize');

        var fakeOptions = {
            foo: 'bar'
          },
          component = new PageableListComponent(fakeOptions);

        expect(PageableListView.prototype.initialize).toHaveBeenCalledWith(fakeOptions);
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        it('should be defined', function() {
          expect(PageableListComponent.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(PageableListView.prototype, 'onSearchRequest');

          var component = new PageableListComponent,
            fakeSearchCriteria = {};

          component.onSearchRequest(fakeSearchCriteria);

          expect(component.view.onSearchRequest).toHaveBeenCalled();
          expect(component.view.onSearchRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });
    });

    describe('events', function() {
      it('should trigger event on search completed', function(done) {
        var component = new PageableListComponent,
          fakeData = {}

        component.on('search:completed', function(data) {
          expect(data).toBe(fakeData);
          done();
        });

        component.view.trigger('search:completed', fakeData);
      });
    });
  });
});