define(function(require) {
  var Backbone = require('backbone'),
    $ = require('jquery'),
    FlagsView = require('./flags.view'),
    FlagsCollection = require('../collections/flags.collection');

  describe('Flags View Component', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(FlagsView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('should have proper class name defined', function() {
        expect(FlagsView.prototype.className).toEqual('efc-flags');
      });
    });

    describe('creation', function() {
      it('should not throw if created without arguments', function() {
        expect(function() {
          new FlagsView;
        }).not.toThrow();
      });

      it('should have collection defined', function() {
        var view = new FlagsView;
        expect(view.collection).toEqual(jasmine.any(FlagsCollection));
      });

      it('should initialize collection with array of flag descriptors', function() {
        spyOn(FlagsCollection.prototype, 'initialize');

        var fakeFlagDescriptors = [],
          view = new FlagsView(fakeFlagDescriptors);

        expect(FlagsCollection.prototype.initialize).toHaveBeenCalledWith(fakeFlagDescriptors);
      });
    });

    describe('api', function() {
      describe('.didClickToggle()', function() {
        it('should be defined', function() {
          expect(FlagsView.prototype.didClickToggle).toEqual(jasmine.any(Function));
        });

        it('should toggle rest container', function() {
          var view = new FlagsView,
            fakeContainer = jasmine.createSpyObj('container', ['toggle']);
          spyOn(FlagsView.prototype, 'getRestContainer').and.returnValue(fakeContainer);

          view.didClickToggle();

          expect(fakeContainer.toggle).toHaveBeenCalled();
        });
      });

      describe('.getRestContainer()', function() {
        it('should be defined', function() {
          expect(FlagsView.prototype.getRestContainer).toEqual(jasmine.any(Function));
        });

        it('should reference proper subelement', function() {
          var fakeRestContainer = {},
            view = new FlagsView;

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.efc-flags__rest') {
              return fakeRestContainer;
            }
          });

          expect(view.getRestContainer()).toBe(fakeRestContainer);
        });
      });

      describe('.getToggleElement()', function() {
        it('should be defined', function() {
          expect(FlagsView.prototype.getToggleElement).toEqual(jasmine.any(Function));
        });

        it('should reference proper subelement', function() {
          var fakeTriggerElement = {},
            view = new FlagsView;

          spyOn($.prototype, 'find').and.callFake(function(selector) {
            if (selector === '.efc-flags__toggle') {
              return fakeTriggerElement;
            }
          });

          expect(view.getToggleElement()).toBe(fakeTriggerElement);
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(FlagsView.prototype.events).toEqual({
            'click .efc-flags__toggle': 'didClickToggle'
          });
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view itself', function() {
          var view = new FlagsView();

          expect(view.render()).toBe(view);
        });
      });

      xit('should render..', function() {
        var view = new FlagsView([{
          code: 'pl'
        }, {
          code: 'de'
        }, {
          code: 'be'
        }, {
          code: 'fr'
        }, {
          code: 'lu'
        }, {
          code: 'ch'
        }, {
          code: 'gr'
        }, {
          code: 'cr'
        }]);

        expect(view.render().$el.html()).toEqual('');
      });
    });
  });
});