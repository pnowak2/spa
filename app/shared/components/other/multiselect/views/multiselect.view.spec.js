define(function(require) {
  var Backbone = require('backbone'),
    $ = require('jquery'),
    MultiselectView = require('./multiselect.view'),
    MultiselectCollection = require('../collections/multiselect.collection');

  describe('Multiselect View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(MultiselectView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(MultiselectView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(MultiselectView.prototype.className).toEqual('vlr-multiselect');
      });
    });

    describe('defaults', function() {
      it('should be properly defined', function() {
        expect(MultiselectView.prototype.defaults).toEqual({
          multiple: true
        });
      });
    });

    describe('creation', function() {
      it('should not throw if no arguments provided', function() {
        expect(function() {
          new MultiselectView();
        }).not.toThrow();
      });

      it('should have collection defined', function() {
        var view = new MultiselectView();

        expect(view.collection).toEqual(jasmine.any(MultiselectCollection));
      });

      it('should initialize collection items', function() {
        spyOn(MultiselectCollection.prototype, 'initialize');

        var fakeItems = {},
          view = new MultiselectView(fakeItems);

        expect(view.collection.initialize).toHaveBeenCalledWith(fakeItems);
      });

      it('should initialize options', function() {
        var fakeOptions = {
            foo: 'bar'
          },
          view = new MultiselectView([], fakeOptions);

        expect(view.options).toEqual(jasmine.objectContaining({
          foo: 'bar'
        }));
        expect(view.options).toEqual(jasmine.objectContaining(view.defaults));
      });

      it('should initialize options with defaults if not provided in arguments', function() {
        var view = new MultiselectView([]);

        expect(view.options).toEqual(view.defaults);
      });

      it('should start listening for collection changes', function() {
        spyOn(MultiselectView.prototype, 'startListeningCollectionChanges');
        var view = new MultiselectView([]);

        expect(view.startListeningCollectionChanges).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.stopListeningCollectionChanges()', function() {
        beforeEach(function() {
          spyOn(MultiselectView.prototype, 'stopListening');
          this.view = new MultiselectView([]);
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.stopListeningCollectionChanges).toEqual(jasmine.any(Function));
        });

        it('should stop listening for collection changes', function() {
          this.view.stopListening.calls.reset();
          this.view.stopListeningCollectionChanges();
          expect(this.view.stopListening.calls.count()).toBe(1);
          expect(this.view.stopListening).toHaveBeenCalledWith(this.view.collection, 'change');
        });
      });

      describe('.startListeningCollectionChanges()', function() {
        beforeEach(function() {
          spyOn(MultiselectView.prototype, 'listenTo');
          this.view = new MultiselectView([]);
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.startListeningCollectionChanges).toEqual(jasmine.any(Function));
        });

        it('should start listening for collection changes', function() {
          this.view.listenTo.calls.reset();
          this.view.startListeningCollectionChanges();
          expect(this.view.listenTo.calls.count()).toBe(1);
          expect(this.view.listenTo).toHaveBeenCalledWith(this.view.collection, 'change', this.view.didSelectionChange);
        });
      });

      describe('.didClickSelectItem()', function() {
        beforeEach(function() {
          spyOn(MultiselectView.prototype, 'stopListeningCollectionChanges');
          spyOn(MultiselectView.prototype, 'startListeningCollectionChanges');
          spyOn(MultiselectCollection.prototype, 'unselectAll');

          this.viewMultiple = new MultiselectView([{
            id: 'de',
            title: 'Germany',
            hint: 'Deutschland',
            selected: false,
            disabled: false
          }], {
            multiple: true
          });

          this.viewSingle = new MultiselectView([{
            id: 'de',
            title: 'Germany',
            hint: 'Deutschland',
            selected: false,
            disabled: false
          }], {
            multiple: false
          });

          this.fakeEvent = {
            params: {
              data: {
                id: 'de'
              }
            }
          };

          this.viewSingle.stopListeningCollectionChanges.calls.reset();
          this.viewSingle.startListeningCollectionChanges.calls.reset();
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.didClickSelectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          var self = this;
          expect(function() {
            self.viewMultiple.didClickSelectItem();
          }).not.toThrow();
        });

        it('should select model', function() {
          expect(this.viewMultiple.collection.get('de').isSelected()).toBe(false);
          this.viewMultiple.didClickSelectItem(this.fakeEvent);
          expect(this.viewMultiple.collection.get('de').isSelected()).toBe(true);
        });

        it('should deselect all if multiple is not active', function() {
          expect(this.viewSingle.collection.unselectAll).not.toHaveBeenCalled();
          this.viewSingle.didClickSelectItem(this.fakeEvent);
          expect(this.viewSingle.collection.unselectAll).toHaveBeenCalled();
        });

        it('should stop listening to collection changes if multiple is not active', function() {
          expect(this.viewSingle.stopListeningCollectionChanges).not.toHaveBeenCalled();
          this.viewSingle.didClickSelectItem(this.fakeEvent);
          expect(this.viewSingle.stopListeningCollectionChanges).toHaveBeenCalled();
        });

        it('should start listening to collection changes if multiple is not active', function() {
          expect(this.viewSingle.startListeningCollectionChanges).not.toHaveBeenCalled();
          this.viewSingle.didClickSelectItem(this.fakeEvent);
          expect(this.viewSingle.startListeningCollectionChanges).toHaveBeenCalled();
        });

        it('should not stop listening to collection changes if multiple is not active', function() {
          expect(this.viewMultiple.stopListeningCollectionChanges).not.toHaveBeenCalled();
          this.viewMultiple.didClickSelectItem(this.fakeEvent);
          expect(this.viewMultiple.stopListeningCollectionChanges).not.toHaveBeenCalled();
        });

        it('should not start listening to collection changes if multiple is not active', function() {
          expect(this.viewMultiple.startListeningCollectionChanges).not.toHaveBeenCalled();
          this.viewMultiple.didClickSelectItem(this.fakeEvent);
          expect(this.viewMultiple.startListeningCollectionChanges).not.toHaveBeenCalled();
        });

        it('should not deselect all if multiple is active', function() {
          expect(this.viewMultiple.collection.unselectAll).not.toHaveBeenCalled();
          this.viewMultiple.didClickSelectItem(this.fakeEvent);
          expect(this.viewMultiple.collection.unselectAll).not.toHaveBeenCalled();
        });

        it('should trigger view event', function() {
          spyOn(MultiselectView.prototype, 'trigger');

          this.viewSingle.didClickSelectItem(this.fakeEvent);

          expect(this.viewSingle.trigger).toHaveBeenCalledWith('multiselect:selected', {
            id: 'de',
            title: 'Germany',
            hint: 'Deutschland',
            selected: true,
            disabled: false
          });
        });
      });

      describe('.didClickUnselectItem()', function() {
        beforeEach(function() {
          this.view = new MultiselectView([{
            id: 'pl',
            title: 'Poland',
            selected: true
          }]);
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.didClickUnselectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          var self = this;
          expect(function() {
            self.view.didClickUnselectItem();
          }).not.toThrow();
        });

        it('should unselect model', function() {
          var fakeEvent = {
            params: {
              data: {
                id: 'pl'
              }
            }
          };

          expect(this.view.collection.get('pl').isSelected()).toBe(true);

          this.view.didClickUnselectItem(fakeEvent);

          expect(this.view.collection.get('pl').isSelected()).toBe(false);
        });
      });

      describe('.didSelectionChange()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.didSelectionChange).toEqual(jasmine.any(Function));
        });

        it('should trigger view event', function() {
          spyOn(MultiselectView.prototype, 'trigger');

          var view = new MultiselectView(),
            fakeModel = {
              toJSON: function() {}
            },
            fakeJSON = {};

          spyOn(fakeModel, 'toJSON').and.returnValue(fakeJSON);

          view.didSelectionChange(fakeModel);

          expect(view.trigger).toHaveBeenCalledWith('multiselect:change', fakeJSON);
        });
      });

      describe('.hasItems()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.hasItems).toEqual(jasmine.any(Function));
        });

        it('should return true if collection is not empty', function() {
          var view = new MultiselectView([{
            id: 1
          }, {
            id: 2
          }]);

          expect(view.hasItems()).toBe(true);
        });

        it('should return false if collection is empty', function() {
          var view = new MultiselectView();
          expect(view.hasItems()).toBe(false);
        });
      });

      describe('.selectedItems()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.selectedItems).toEqual(jasmine.any(Function));
        });

        it('should return selected items objects from collection', function() {
          var view = new MultiselectView([{
            id: 'pl',
            title: 'Poland',
            hint: 'Polska',
            selected: true,
            disabled: false
          }, {
            id: 'de',
            title: 'Germany',
            hint: 'Deutschland',
            selected: false,
            disabled: false
          }, {
            id: 'be',
            title: 'Belgium',
            hint: 'Belgique',
            selected: true,
            disabled: false
          }]);

          expect(view.selectedItems().length).toBe(2);
          expect(view.selectedItems()).toEqual([{
            id: 'pl',
            title: 'Poland',
            hint: 'Polska',
            selected: true,
            disabled: false
          }, {
            id: 'be',
            title: 'Belgium',
            hint: 'Belgique',
            selected: true,
            disabled: false
          }]);
        });
      });

      describe('.firstSelectedItem()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.firstSelectedItem).toEqual(jasmine.any(Function));
        });

        it('should return first selected item object from collection', function() {
          var view = new MultiselectView([{
            id: 'pl',
            title: 'Poland',
            hint: 'Polska',
            selected: true,
            disabled: false
          }, {
            id: 'de',
            title: 'Germany',
            hint: 'Deutschland',
            selected: false,
            disabled: false
          }, {
            id: 'be',
            title: 'Belgium',
            hint: 'Belgique',
            selected: true,
            disabled: false
          }]);

          expect(view.firstSelectedItem()).toEqual({
            id: 'pl',
            title: 'Poland',
            hint: 'Polska',
            selected: true,
            disabled: false
          });
        });

        it('should return false if there are no selections', function() {
          var view = new MultiselectView([{
            id: 'pl',
            title: 'Poland',
            hint: 'Polska',
            selected: false,
            disabled: false
          }]);

          expect(view.firstSelectedItem()).toEqual(void 0);
        });
      });

      describe('.hasSelection()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.hasSelection).toEqual(jasmine.any(Function));
        });

        it('should delegate to collection', function() {
          var view = new MultiselectView(),
            fakeHasSelection = {};

          spyOn(MultiselectCollection.prototype, 'hasSelection').and.returnValue(fakeHasSelection);

          expect(view.hasSelection()).toBe(fakeHasSelection);
        });
      });

      describe('.hasOneSelection()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.hasOneSelection).toEqual(jasmine.any(Function));
        });

        it('should delegate to collection', function() {
          var view = new MultiselectView(),
            fakeHasOneSelection = {};

          spyOn(MultiselectCollection.prototype, 'hasOneSelection').and.returnValue(fakeHasOneSelection);

          expect(view.hasOneSelection()).toBe(fakeHasOneSelection);
        });
      });

      describe('.isDirty()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.isDirty).toEqual(jasmine.any(Function));
        });

        it('should delegate to collection', function() {
          var view = new MultiselectView(),
            fakeIsDirty = true;

          spyOn(MultiselectCollection.prototype, 'isDirty').and.returnValue(fakeIsDirty);

          expect(view.isDirty()).toBe(fakeIsDirty);
        });
      });

      describe('.selectItems()', function() {
        beforeEach(function() {
          spyOn(MultiselectView.prototype, 'render');
          spyOn(MultiselectCollection.prototype, 'selectItems');
          this.view = new MultiselectView();
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.selectItems).toEqual(jasmine.any(Function));
        });

        it('should delegate to collection', function() {
          var fakeItemIds = {};
          this.view.selectItems(fakeItemIds);
          expect(this.view.collection.selectItems).toHaveBeenCalledWith(fakeItemIds);
        });

        it('should rerender', function() {
          this.view.selectItems();
          expect(this.view.render).toHaveBeenCalled();
        });
      });

      describe('.selectItem()', function() {
        beforeEach(function() {
          spyOn(MultiselectView.prototype, 'render');
          spyOn(MultiselectCollection.prototype, 'selectItem');
          this.view = new MultiselectView();
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.selectItem).toEqual(jasmine.any(Function));
        });

        it('should delegate to collection', function() {
          var fakeItemId = 'fake id';
          this.view.selectItem(fakeItemId);
          expect(this.view.collection.selectItem).toHaveBeenCalledWith(fakeItemId);
        });

        it('should rerender', function() {
          this.view.selectItem();
          expect(this.view.render).toHaveBeenCalled();
        });
      });

      describe('.update()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should reset collectio with items', function() {
          spyOn(MultiselectCollection.prototype, 'reset');

          var fakeItems = {},
            view = new MultiselectView();

          view.update(fakeItems);

          expect(view.collection.reset).toHaveBeenCalledWith(fakeItems);
        });
      });

      describe('.update', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.clear).toEqual(jasmine.any(Function));
        });

        it('should remove all items by updating collection with empty array', function() {
          spyOn(MultiselectView.prototype, 'update');

          var view = new MultiselectView();

          view.clear();

          expect(view.update).toHaveBeenCalledWith([]);
        });
      });

      describe('.unselectAll()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.unselectAll).toEqual(jasmine.any(Function));
        });

        it('should clear all selections and rerender', function() {
          spyOn(MultiselectCollection.prototype, 'unselectAll');
          spyOn(MultiselectView.prototype, 'render');

          var view = new MultiselectView();

          view.unselectAll();

          expect(view.collection.unselectAll).toHaveBeenCalled();
          expect(view.render).toHaveBeenCalled();
        });
      });

      describe('.getSelectElement()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.getSelectElement).toEqual(jasmine.any(Function));
        });

        it('should get table body element', function() {
          var view = new MultiselectView(),
            fakeSelectElement = {},
            foundSelectElement;

          spyOn(view.$el, 'find').and.callFake(function(selector) {
            if (selector === 'select') {
              return fakeSelectElement;
            }
          });

          foundSelectElement = view.getSelectElement();

          expect(view.$el.find).toHaveBeenCalledWith('select');
          expect(foundSelectElement).toEqual(fakeSelectElement);
        });
      });

      describe('.disable()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.disable).toEqual(jasmine.any(Function));
        });

        it('should disable select element', function() {
          var view = new MultiselectView();

          view.render();

          expect(view.getSelectElement()).not.toHaveAttr('disabled');
          view.disable();
          expect(view.getSelectElement()).toHaveAttr('disabled');
        });
      });

      describe('.enable()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.enable).toEqual(jasmine.any(Function));
        });

        it('should enable select element', function() {
          var view = new MultiselectView();

          view.render().disable();

          expect(view.getSelectElement()).toHaveAttr('disabled');
          view.enable();
          expect(view.getSelectElement()).not.toHaveAttr('disabled');
        });
      });

      describe('.isEnabled()', function() {
        beforeEach(function() {
          this.view = new MultiselectView();
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.isEnabled).toEqual(jasmine.any(Function));
        });

        it('should return false if is disabled', function() {
          this.view.render();
          this.view.disable();

          expect(this.view.getSelectElement()).toBeDisabled();
        });

        it('should return true if is not disabled', function() {
          this.view.render();
          this.view.enable();

          expect(this.view.getSelectElement()).not.toBeDisabled();
        });
      });

      describe('.isVisible()', function() {
        beforeEach(function() {
          this.view = new MultiselectView();
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.isVisible).toEqual(jasmine.any(Function));
        });

        it('should return false if is hidden', function() {
          this.view.render();
          this.view.$el.hide();

          expect(this.view.isVisible()).toBe(false);
        });

        it('should return true if is visible', function() {
          this.view.render();
          this.view.$el.show();

          expect(this.view.isVisible()).toBe(true);
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(MultiselectView.prototype.events).toEqual({
            'select2:select select': 'didClickSelectItem',
            'select2:unselect select': 'didClickUnselectItem'
          });
        });
      });

      describe('custom', function() {
        it('should rerender when collection resets', function() {
          spyOn(MultiselectView.prototype, 'render');

          var view = new MultiselectView();

          view.collection.reset([]);

          expect(view.render).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      beforeEach(function() {
        this.view = new MultiselectView([{
          id: 'pl',
          title: 'Poland',
          selected: true,
          hint: 'Polska'
        }, {
          id: 'de',
          title: 'Germany',
          selected: false,
          disabled: true
        }, {
          id: 'be',
          title: 'Belgium',
          selected: true
        }], {
          multiple: true
        });

        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render select with 100% width', function() {
          expect(this.$el.find('select')).toHaveCss({
            width: '100%'
          });
        });

        it('should render select', function() {
          expect(this.$el).toContainElement('select');
        });

        it('should render multiple options select', function() {
          expect(this.$el.find('select')).toHaveAttr('multiple');
        });

        it('should render single option select', function() {
          this.view.options = {
            multiple: false
          };
          expect(this.view.render().$el.find('select')).not.toHaveAttr('multiple');
        });

        it('should render disabled select', function() {
          this.view.options = {
            disabled: true
          };
          expect(this.view.render().$el.find('select')).toHaveAttr('disabled');
        });

        it('should render disabled select item', function() {
          expect(this.$el.find('option').eq(1)).toHaveAttr('disabled');
        });

        it('should render select item with hint text', function() {
          expect(this.$el.find('option').first()).toHaveAttr('title', 'Polska');
        });

        it('should render three option elements with proper data', function() {
          expect(this.$el.find('option')).toHaveLength(3);

          expect(this.$el.find('option').first()).toContainText('Poland');
          expect(this.$el.find('option').first()).toHaveAttr('value', 'pl');
          expect(this.$el.find('option').first()).toHaveAttr('selected');

          expect(this.$el.find('option').eq(1)).toContainText('Germany');
          expect(this.$el.find('option').eq(1)).toHaveAttr('value', 'de');
          expect(this.$el.find('option').eq(1)).not.toHaveAttr('selected');


          expect(this.$el.find('option').last()).toContainText('Belgium');
          expect(this.$el.find('option').last()).toHaveAttr('value', 'be');
          expect(this.$el.find('option').last()).toHaveAttr('selected');
        });

        it('should run select2 plugin', function() {
          spyOn(this.view, 'getSelectElement').and.returnValue($.prototype);
          spyOn($.prototype, 'select2');

          this.view.render();

          expect(this.view.getSelectElement().select2).toHaveBeenCalledWith(this.view.options);
        });
      });
    });
  });
});