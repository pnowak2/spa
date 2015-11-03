define(function(require) {
  var TabView = require('app/widgets/tab-switcher/views/tabView'),
    TabModel = require('app/widgets/tab-switcher/models/tabModel'),
    eventBus = require('app/widgets/tab-switcher/events/eventBus');

  describe('Tab View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(TabView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.tagName', function() {
        expect(TabView.prototype.tagName).toEqual('li');
      });

      it('.className', function() {
        expect(TabView.prototype.className).toEqual('efc-tab');
      });
    });

    describe('api', function() {
      describe('.didClickTab()', function() {
        it('should be defined', function() {
          expect(TabView.prototype.didClickTab).toEqual(jasmine.any(Function));
        });

        it('should select on model', function() {
          var view = new TabView({
            model: new TabModel
          });

          spyOn(view.model, 'select');
          view.didClickTab();

          expect(view.model.select).toHaveBeenCalled();
        });
      });

      describe('.isSelected()', function() {
        it('should be defined', function() {
          expect(TabView.prototype.isSelected).toEqual(jasmine.any(Function));
        });

        it('should check on model', function() {
          var view = new TabView({
              model: new TabModel
            }),
            fakeIsSelected = {},
            result;

          spyOn(view.model, 'isSelected').and.returnValue(fakeIsSelected);
          result = view.isSelected();

          expect(result).toBe(fakeIsSelected);
        });
      });

      describe('.didModelSelectionChange()', function() {

        beforeEach(function() {
          this.fakeModelJSON = {};
          this.model = new TabModel({
            selected: true
          });
          this.view = new TabView({
            model: this.model
          });

          spyOn(eventBus, 'trigger');
          spyOn(TabModel.prototype, 'toJSON').and.returnValue(this.fakeModelJSON);
        });

        it('should be defined', function() {
          expect(TabView.prototype.didModelSelectionChange).toEqual(jasmine.any(Function));
        });

        it('should trigger event bus if model is selected', function() {
          this.view.didModelSelectionChange();
          expect(eventBus.trigger).toHaveBeenCalledWith('tab-switcher:tab:selected', this.fakeModelJSON);
        });

        it('should have selected css class if selected', function() {
          this.view.didModelSelectionChange();
          expect(this.view.$el).toHaveClass('efc-selected');
        });

        it('should not trigger event bus if model is not selected', function() {
          this.model.deselect();
          this.view.didModelSelectionChange();
          expect(eventBus.trigger).not.toHaveBeenCalled();
        });

        it('should not have css class if not selected', function() {
          this.model.deselect();
          this.view.didModelSelectionChange();
          expect(this.view.$el).not.toHaveClass('efc-selected');
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should be properly defined', function() {
          expect(TabView.prototype.events).toEqual({
            'click': 'didClickTab'
          });
        });
      });

      describe('model', function() {
        it('should listen to changes', function() {
          spyOn(TabView.prototype, 'didModelSelectionChange');

          var view = new TabView({
            model: new TabModel
          });

          view.model.trigger('change:selected');

          expect(TabView.prototype.didModelSelectionChange).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should render proper text in tab', function() {
          var view = new TabView({
            model: new TabModel({
              title: 'List',
              identifier: 'list',
              selected: true
            })
          });

          view.render();

          expect(view.$el).toContainText('List');
        });
      });
    });
  });
});