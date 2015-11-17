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

    describe('creation', function() {
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
    });

    describe('api', function() {
      describe('.didSelectItem()', function() {
        beforeEach(function() {
          this.view = new MultiselectView([{
            id: 'de',
            title: 'Germany',
            selected: false
          }]);
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.didSelectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          var self = this;
          expect(function() {
            self.view.didSelectItem();
          }).not.toThrow();
        });

        it('should select model', function() {
          var fakeEvent = {
            params: {
              data: {
                id: 'de'
              }
            }
          };

          expect(this.view.collection.get('de').isSelected()).toBe(false);

          this.view.didSelectItem(fakeEvent);

          expect(this.view.collection.get('de').isSelected()).toBe(true);
        });
      });

      describe('.didUnselectItem()', function() {
        beforeEach(function() {
          this.view = new MultiselectView([{
            id: 'pl',
            title: 'Poland',
            selected: true
          }]);
        });

        it('should be defined', function() {
          expect(MultiselectView.prototype.didUnselectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          var self = this;
          expect(function() {
            self.view.didUnselectItem();
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

          this.view.didUnselectItem(fakeEvent);

          expect(this.view.collection.get('pl').isSelected()).toBe(false);
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
          }])
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

      describe('.selectElement()', function() {
        it('should be defined', function() {
          expect(MultiselectView.prototype.selectElement).toEqual(jasmine.any(Function));
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

          foundSelectElement = view.selectElement();

          expect(view.$el.find).toHaveBeenCalledWith('select');
          expect(foundSelectElement).toEqual(fakeSelectElement);
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(MultiselectView.prototype.events).toEqual({
            'select2:select select': 'didSelectItem',
            'select2:unselect select': 'didUnselectItem'
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
        }])

        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render select', function() {
          expect(this.$el).toContainElement('select');
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
          spyOn(this.view, 'selectElement').and.returnValue($.prototype);
          spyOn($.prototype, 'select2');

          this.view.render();

          expect(this.view.selectElement().select2).toHaveBeenCalled();
        });
      });
    });
  });
});