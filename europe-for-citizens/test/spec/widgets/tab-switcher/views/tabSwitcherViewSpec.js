define(function(require) {
  var Backbone = require('backbone'),
    TabView = require('app/widgets/tab-switcher/views/tabView'),
    TabSwitcherView = require('app/widgets/tab-switcher/views/tabSwitcherView'),
    TabsCollection = require('app/widgets/tab-switcher/collections/tabsCollection'),
    TabModel = require('app/widgets/tab-switcher/models/tabModel');


  describe('Tab Switcher View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(TabSwitcherView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should be possible to create without configuration', function() {
        var view = new TabSwitcherView;
        expect(view).toEqual(jasmine.any(TabSwitcherView));
      });

      it('should have collection defined', function() {
        var view = new TabSwitcherView;
        expect(view.collection).toEqual(jasmine.any(TabsCollection))
      });

      it('should return collection with passed configuration', function() {
        spyOn(TabsCollection.prototype, 'initialize');
        var fakeOptions = {
          configuration: {}
        };

        new TabSwitcherView(fakeOptions)

        expect(TabsCollection.prototype.initialize).toHaveBeenCalledWith(fakeOptions.configuration);
      });
    });

    describe('properties', function() {
      it('.tagName', function() {
        expect(TabSwitcherView.prototype.tagName).toEqual('ul');
      });

      it('.className', function() {
        expect(TabSwitcherView.prototype.className).toEqual('efc-tabs');
      });
    });

    describe('api', function() {
      describe('.didClickTab()', function() {
        it('should be defined', function() {
          expect(TabSwitcherView.prototype.didClickTab).toEqual(jasmine.any(Function));
        });

        it('should select tab on collection', function() {
          spyOn(TabsCollection.prototype, 'selectTab');

          var view = new TabSwitcherView;
          view.didClickTab('tab-id');

          expect(view.collection.selectTab).toHaveBeenCalledWith('tab-id');
        });
      });

      describe('.didModelSelectionChange', function() {
        it('should be defined', function() {
          expect(TabSwitcherView.prototype.didModelSelectionChange).toEqual(jasmine.any(Function));
        });

        it('should toggle target element visibility', function() {
          spyOn(Backbone.$.prototype, 'toggle');
          var model = new TabModel({
            selected: true,
            targetSelector: '.foo'
          });

          TabSwitcherView.prototype.didModelSelectionChange(model);

          expect(Backbone.$.prototype.toggle).toHaveBeenCalledWith(model.isSelected());
        });
      });

      describe('.createTabViews()', function() {
        it('should be defined', function() {
          expect(TabSwitcherView.prototype.createTabViews).toEqual(jasmine.any(Function));
        });

        it('should return array of views', function() {
          var tabSwitcherView = new TabSwitcherView({
              configuration: [{
                title: 'Tab title',
                identifier: 'tabdi',
                selected: false,
                targetSelector: '.selector'
              }]
            }),
            tabViews = tabSwitcherView.createTabViews(),
            tabView = tabViews[0];

          expect(tabViews.length).toBe(1);
          expect(tabView.model.toJSON()).toEqual(jasmine.objectContaining({
            title: 'Tab title',
            identifier: 'tabdi',
            selected: false,
            targetSelector: '.selector'
          }))
        });
      });

      describe('events', function() {
        beforeEach(function() {
          spyOn(TabSwitcherView.prototype, 'didModelSelectionChange');
          spyOn(TabSwitcherView.prototype, 'didClickTab');

          this.tabSwitcherView = new TabSwitcherView;
        });

        describe('tab selection change', function() {
          it('should call method on tab model selection change', function() {
            var fakeModel = {};

            this.tabSwitcherView.collection.trigger('change:selected', fakeModel);

            expect(this.tabSwitcherView.didModelSelectionChange).toHaveBeenCalledWith(fakeModel);
          });
        });

        describe('tab selection change', function() {
          it('should call method on tab selection request', function() {
            var fakeData = {};

            this.tabSwitcherView.collection.trigger('tab:selection-request', fakeData);

            expect(this.tabSwitcherView.didClickTab).toHaveBeenCalledWith(fakeData);
          });
        });
      });

      describe('rendering', function() {
        describe('.render()', function() {
          it('should return view object', function() {
            var view = new TabSwitcherView;
            expect(view.render()).toBe(view);
          });

          it('should render tabs', function() {
            var tabView = new TabView({
                model: new TabModel
              }),
              tabSwitcherView = new TabSwitcherView;

            spyOn(tabSwitcherView.$el, 'append');
            spyOn(TabSwitcherView.prototype, 'createTabViews').and.returnValue([tabView]);
            spyOn(TabView.prototype, 'render').and.callThrough();

            tabSwitcherView.render();

            expect(tabView.render.calls.count()).toBe(1);
            expect(tabSwitcherView.$el.append.calls.count()).toBe(1);
            expect(tabSwitcherView.$el.append).toHaveBeenCalledWith(tabView.el);
          });
        });
      });
    });
  });
});