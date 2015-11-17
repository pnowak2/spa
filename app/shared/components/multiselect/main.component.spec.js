define(function(require) {
  var Component = require('app/core/component'),
    MultiselectComponent = require('./main.component'),
    MultiselectView = require('./views/multiselect.view');

  describe('Multiselect Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(MultiselectComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have view defined', function() {
        var component = new MultiselectComponent;
        expect(component.view).toEqual(jasmine.any(MultiselectView));
      });
    });

    describe('api', function() {
      describe('.selectedItems()', function() {
        it('should be defined', function() {
          expect(MultiselectComponent.prototype.selectedItems).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new MultiselectComponent,
            fakeSelectedItems = [];

          spyOn(component.view, 'selectedItems').and.returnValue(fakeSelectedItems);

          var selectedItems = component.selectedItems();

          expect(selectedItems).toBe(fakeSelectedItems);

        });
      });

      describe('.update', function() {
        it('should be defined', function() {
          expect(MultiselectComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          var component = new MultiselectComponent,
            fakeItems = [];

          spyOn(component.view, 'update');

          component.update(fakeItems);

          expect(component.view.update).toHaveBeenCalledWith(fakeItems);
        });
      });
    });
  });
});