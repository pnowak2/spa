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
        expect(MultiselectView.prototype.className).toEqual('efc-multiselect');
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
          new MultiselectView;
        }).not.toThrow();
      });

      it('should have collection defined', function() {
        var view = new MultiselectView;

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
    });

    describe('api', function() {
      describe('.didClickSelectItem()', function() {
        beforeEach(function() {
          spyOn(MultiselectCollection.prototype, 'unselectAll');

          this.viewMultiple = new MultiselectView([{
            id: 'de',
            title: 'Germany',
            selected: false
          }], {
            multiple: true
          });

          this.viewSingle = new MultiselectView([{
            id: 'de',
            title: 'Germany',
            selected: false
          }], {
            multiple: false
          });

          this.fakeEvent = {
            params: {
              data: {
                id: 'de'
              }
            }
          }
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
            selected: true
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

          var view = new MultiselectView;

          view.didSelectionChange();

          expect(view.trigger).toHaveBeenCalledWith('multiselect:change');
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
            selected: true
          }, {
            id: 'de',
            title: 'Germany',
            selected: false
          }, {
            id: 'be',
            title: 'Belgium',
            selected: true
          }]);

          expect(view.selectedItems().length).toBe(2);
          expect(view.selectedItems()).toEqual([{
            id: 'pl',
            title: 'Poland',
            selected: true
          }, {
            id: 'be',
            title: 'Belgium',
            selected: true
          }]);
        });
      });

      describe('.hasSelection()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.hasSelection).toEqual(jasmine.any(Function));
        });

        it('should delegate to collection', function() {
          var view = new MultiselectView,
            fakeHasSelection = {};

          spyOn(MultiselectCollection.prototype, 'hasSelection').and.returnValue(fakeHasSelection);

          expect(view.hasSelection()).toBe(fakeHasSelection);
        });
      });

      describe('.selectItems()', function() {
        beforeEach(function() {
          spyOn(MultiselectView.prototype, 'render');
          spyOn(MultiselectCollection.prototype, 'selectItems');
          this.view = new MultiselectView;
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

      describe('.update()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should reset collectio with items', function() {
          spyOn(MultiselectCollection.prototype, 'reset');

          var fakeItems = {},
            view = new MultiselectView;

          view.update(fakeItems);

          expect(view.collection.reset).toHaveBeenCalledWith(fakeItems);
        });
      });

      describe('.unselectAll()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.unselectAll).toEqual(jasmine.any(Function));
        });

        it('should clear all selections and rerender', function() {
          spyOn(MultiselectCollection.prototype, 'unselectAll');
          spyOn(MultiselectView.prototype, 'render');

          var view = new MultiselectView;

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
          var view = new MultiselectView,
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
          var view = new MultiselectView;

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
          var view = new MultiselectView;

          view.render().disable();

          expect(view.getSelectElement()).toHaveAttr('disabled');
          view.enable();
          expect(view.getSelectElement()).not.toHaveAttr('disabled');
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(MultiselectView.prototype.events).toEqual({
            'select2:select select': 'didClickSelectItem',
            'select2:unselect select': 'didClickUnselectItem',
            'change select': 'didSelectionChange'
          });
        });
      });

      describe('custom', function() {
        it('should rerender when collection resets', function() {
          spyOn(MultiselectView.prototype, 'render');

          var view = new MultiselectView;

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
          selected: true
        }, {
          id: 'de',
          title: 'Germany',
          selected: false
        }, {
          id: 'be',
          title: 'Belgium',
          selected: true
        }], {
          multiple: true
        })

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

        it('should render multiple options select', function() {
          this.view.options = {
            multiple: false
          }
          expect(this.view.render().$el.find('select')).not.toHaveAttr('multiple');
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