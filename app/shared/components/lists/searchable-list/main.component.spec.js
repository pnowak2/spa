define(function(require) {
  var Component = require('app/core/component'),
    SearchableListComponent = require('./main.component'),
    SearchableListView = require('./views/searchableList.view');

  describe('Searchable List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchableListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new SearchableListComponent();
        expect(component.view).toEqual(jasmine.any(SearchableListView));
      });

      it('should pass options to its view', function() {
        spyOn(SearchableListView.prototype, 'initialize');

        var fakeOptions = {
            foo: 'bar'
          },
          component = new SearchableListComponent(fakeOptions);

        expect(SearchableListView.prototype.initialize).toHaveBeenCalledWith(fakeOptions);
      });
    });

    describe('api', function() {
      describe('.onSearchRequest()', function() {
        it('should be defined', function() {
          expect(SearchableListComponent.prototype.onSearchRequest).toEqual(jasmine.any(Function));
        });

        it('should delegate do view', function() {
          spyOn(SearchableListView.prototype, 'onSearchRequest');

          var component = new SearchableListComponent(),
            fakeSearchCriteria = {};

          component.onSearchRequest(fakeSearchCriteria);

          expect(component.view.onSearchRequest).toHaveBeenCalled();
          expect(component.view.onSearchRequest.calls.mostRecent().args[0]).toBe(fakeSearchCriteria);
        });
      });
    });

    describe('events', function() {
      it('should trigger event on search completed', function(done) {
        var component = new SearchableListComponent(),
          fakeData = {};

        component.on('search:completed', function(data) {
          expect(data).toBe(fakeData);
          done();
        });

        component.view.trigger('search:completed', fakeData);
      });
    });
  });
});