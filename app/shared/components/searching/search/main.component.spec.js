define(function(require) {
  var Component = require('app/core/component'),
    SearchComponent = require('./main.component'),
    SearchView = require('./views/search.view');

  describe('Search Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have view defined', function() {
        var component = new SearchComponent();
        expect(component.view).toEqual(jasmine.any(SearchView));
      });

      it('should pass options to its view', function() {
        spyOn(SearchView.prototype, 'initialize');

        var fakeOptions = {
            foo: 'bar'
          },
          component = new SearchComponent(fakeOptions);

        expect(SearchView.prototype.initialize).toHaveBeenCalledWith(fakeOptions);
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(SearchComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(SearchView.prototype, 'update');

          var component = new SearchComponent(),
            fakeCriteria = {};
          component.update(fakeCriteria);

          expect(component.view.update).toHaveBeenCalledWith(fakeCriteria);
        });
      });

      describe('.requestSearch()', function() {
        it('should be defined', function() {
          expect(SearchComponent.prototype.requestSearch).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(SearchView.prototype, 'requestSearch');

          var component = new SearchComponent();
          component.requestSearch();

          expect(component.view.requestSearch).toHaveBeenCalled();
        });
      });
    });

    describe('events', function() {
      it('should trigger search event on searchbox search action', function(done) {
        var component = new SearchComponent(),
          fakeCriteria = {};

        component.on('search:search', function(criteria) {
          expect(criteria).toBe(fakeCriteria);
          done();
        });

        component.view.trigger('search:search', fakeCriteria);
      });
    });
  });
});