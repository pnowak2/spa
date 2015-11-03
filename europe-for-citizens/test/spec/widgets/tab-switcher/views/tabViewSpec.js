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

      describe('.didModelChange()', function() {

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
          expect(TabView.prototype.didModelChange).toEqual(jasmine.any(Function));
        });

        it('should trigger event bus if model is selected', function() {
          this.view.didModelChange();
          expect(eventBus.trigger).toHaveBeenCalledWith('tab-switcher:tab:selected', this.fakeModelJSON);
        });

        it('should not trigger event bus if model is not selected', function() {
          this.model.deselect();
          this.view.didModelChange();
          expect(eventBus.trigger).not.toHaveBeenCalled();
        });

        it('should rerender', function() {
          spyOn(TabView.prototype, 'render');
          this.view.didModelChange();

          expect(this.view.render).toHaveBeenCalled();
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
          spyOn(TabView.prototype, 'didModelChange');

          var view = new TabView({
            model: new TabModel
          });

          view.model.trigger('change');

          expect(TabView.prototype.didModelChange).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should have selected css class if selected', function() {
          var view = new TabView({
            model: new TabModel({
              selected: true
            })
          });

          view.render();

          expect(view.$el).toHaveClass('efc-selected');
        });

        it('should not have selected css class if not selected', function() {
          var view = new TabView({
            model: new TabModel({
              selected: false
            })
          });

          view.render();

          expect(view.$el).not.toHaveClass('efc-selected');
        });

        it('should render proper text in tab', function() {
          var view = new TabView({
            model: new TabModel({
              title: 'Tab Text',
              identifier: 'list',
              selected: true
            })
          });

          view.render();

          expect(view.$el).toContainText('Tab Text');
        });
      });
    });
  });
});