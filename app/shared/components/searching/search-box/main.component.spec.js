define(function(require) {
  var SearchBoxComponent = require('./main.component'),
    SearchBoxView = require('./views/searchBox.view'),
    Component = require('app/core/component');

  describe('SearchBox Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchBoxComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new SearchBoxComponent();
        expect(component.view).toEqual(jasmine.any(SearchBoxView));
      });
    });

    describe('api', function() {
      describe('.requestSearch()', function() {
        it('should be defined', function() {
          expect(SearchBoxComponent.prototype.requestSearch).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(SearchBoxView.prototype, 'requestSearch');

          var component = new SearchBoxComponent();
          component.requestSearch();

          expect(component.view.requestSearch).toHaveBeenCalled();
        });
      });
      
      describe('.toggleMoreButtonStateToOpened()', function() {
        it('should be defined', function() {
          expect(SearchBoxComponent.prototype.toggleMoreButtonStateToOpened).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new SearchBoxComponent();

          spyOn(component.view, 'toggleMoreButtonStateToOpened');

          component.toggleMoreButtonStateToOpened();

          expect(component.view.toggleMoreButtonStateToOpened).toHaveBeenCalled();
        });
      });

      describe('.toggleMoreButtonStateToClosed()', function() {
        it('should be defined', function() {
          expect(SearchBoxComponent.prototype.toggleMoreButtonStateToClosed).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new SearchBoxComponent();

          spyOn(component.view, 'toggleMoreButtonStateToClosed');

          component.toggleMoreButtonStateToClosed();

          expect(component.view.toggleMoreButtonStateToClosed).toHaveBeenCalled();
        });
      });

      describe('.update()', function() {
        it('should be defined', function() {
          expect(SearchBoxComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(SearchBoxView.prototype, 'update');

          var component = new SearchBoxComponent(),
            fakeCriteria = {};
          component.update(fakeCriteria);

          expect(component.view.update).toHaveBeenCalledWith(fakeCriteria);
        });
      });
    });

    describe('events', function() {
      it('should trigger event on search action', function(done) {
        var component = new SearchBoxComponent(),
          fakeSearchCriteria = {};

        component.on('search-box:search', function(searchCriteria) {
          expect(searchCriteria).toBe(fakeSearchCriteria);
          done();
        });

        component.view.trigger('search-box:search', fakeSearchCriteria);
      });

      it('should trigger event on more action', function(done) {
        var component = new SearchBoxComponent();

        component.on('search-box:more', function() {
          expect(true).toBe(true);
          done();
        });

        component.view.trigger('search-box:more');
      });

      it('should trigger event on key down', function(done) {
        var component = new SearchBoxComponent();

        component.on('search-box:key-down', function(keyCode) {
          expect(keyCode).toEqual('a');
          done();
        });

        component.view.trigger('search-box:key-down', 'a');
      });
    });
  });
});