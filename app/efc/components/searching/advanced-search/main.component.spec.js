define(function(require) {
  var Component = require('app/core/component'),
    AdvancedSearchComponent = require('./main.component'),
    AdvancedSearchView = require('./views/advancedSearch.view');

  describe('Advanced Search Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(AdvancedSearchComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.advancedSearchComponent = new AdvancedSearchComponent;
      });

      it('should be initialized with proper view', function() {
        expect(this.advancedSearchComponent.view).toEqual(jasmine.any(AdvancedSearchView));
      });

      it('should pass data to view', function() {
        spyOn(AdvancedSearchView.prototype, 'initialize');
        var fakeData = {},
          component = new AdvancedSearchComponent(fakeData);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeData);
      });
    });

    describe('api', function() {
      describe('.getCriteria()', function() {
        it('should be defined', function() {
          expect(AdvancedSearchComponent.prototype.getCriteria).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var fakeViewCriteria = {},
            component;

          spyOn(AdvancedSearchView.prototype, 'getCriteria').and.returnValue(fakeViewCriteria);

          component = new AdvancedSearchComponent;
          expect(component.getCriteria()).toBe(fakeViewCriteria);
        });
      });
    });
  });
});