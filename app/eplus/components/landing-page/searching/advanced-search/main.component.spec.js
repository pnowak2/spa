define(function(require) {
  var Component = require('app/core/component'),
    AdvancedSearchComponent = require('./main.component'),
    AdvancedSearchView = require('./views/advancedSearch.view');

  describe('EPLUS Advanced Search Component', function() {
    it('should be a component', function() {
      expect(AdvancedSearchComponent.prototype).toEqual(jasmine.any(Component));
    });

    describe('API', function() {
      it('should be initialized', function() {
        var advancedSearchComponent = new AdvancedSearchComponent();
        expect(advancedSearchComponent.view).toEqual(jasmine.any(AdvancedSearchView));
      });
    });

    describe('.getCriteria()', function() {
      it('should be defined', function() {
        expect(AdvancedSearchComponent.prototype.getCriteria).toEqual(jasmine.any(Function));
      });

      it('should delegate the calling to the view', function() {

        var view = new AdvancedSearchView(),
          fakeResponse = {};

        spyOn(AdvancedSearchView.prototype, 'getCriteria').and.returnValue(fakeResponse);

        expect(view.getCriteria()).toEqual(fakeResponse);
      });
    });

    describe('.isDirty()', function() {
      it('should be defined', function() {
        expect(AdvancedSearchComponent.prototype.isDirty).toEqual(jasmine.any(Function));
      });

      it('should delegate to view', function() {
        var component = new AdvancedSearchComponent(),
          fakeHasSelections = {};

        spyOn(AdvancedSearchView.prototype, 'isDirty').and.returnValue(fakeHasSelections);

        expect(component.isDirty()).toBe(fakeHasSelections);
      });
    });

    describe('.update()', function() {
      it('should be defined', function() {
        expect(AdvancedSearchComponent.prototype.update).toEqual(jasmine.any(Function));
      });

      it('should delegate to view', function() {
        spyOn(AdvancedSearchView.prototype, 'update');

        var component = new AdvancedSearchComponent(),
          fakeCriteria = {};
        component.update(fakeCriteria);

        expect(component.view.update).toHaveBeenCalledWith(fakeCriteria);
      });
    });
  });
});