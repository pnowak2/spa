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

      it('should not throw if no arguments provided', function() {
        expect(function() {
          new MultiselectComponent;
        }).not.toThrow();
      });

      it('should initialize view with items', function() {
        spyOn(MultiselectView.prototype, 'initialize');

        var fakeItems = [],
          component = new MultiselectComponent(fakeItems);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeItems, {});
      });

      it('should initialize view with items and options', function() {
        spyOn(MultiselectView.prototype, 'initialize');

        var fakeItems = [],
          fakeOptions = [],
          component = new MultiselectComponent(fakeItems, fakeOptions);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeItems, fakeOptions);
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