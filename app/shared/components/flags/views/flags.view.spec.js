define(function(require) {
  var Backbone = require('backbone'),
    $ = require('jquery'),
    FlagsView = require('./flags.view'),
    FlagsCollection = require('../collections/flags.collection'),
    eightFlags = [{
      code: 'pl',
      fullName: 'Poland'
    }, {
      code: 'de',
      fullName: 'Germany'
    }, {
      code: 'be',
      fullName: 'Belgium'
    }, {
      code: 'fr',
      fullName: 'France'
    }, {
      code: 'lu',
      fullName: 'Luxembourg'
    }, {
      code: 'ch',
      fullName: 'Switzerland'
    }, {
      code: 'gr',
      fullName: 'Greece'
    }, {
      code: 'cr',
      fullName: 'Croatia'
    }];

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

        it('should prevent default action', function() {
          var view = new FlagsView,
            fakeEvent = jasmine.createSpyObj('evt', ['preventDefault']);

          view.didClickToggle(fakeEvent);

          expect(fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should toggle collapsed class on root element', function() {
          var view = new FlagsView,
            fakeEvent = jasmine.createSpyObj('evt', ['preventDefault']);

          view.render();

          spyOn(view.$el, 'toggleClass');

          view.didClickToggle(fakeEvent);

          expect(view.$el.toggleClass).toHaveBeenCalledWith('efc-flags--collapsed')
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
        beforeEach(function() {
          this.view = new FlagsView(eightFlags);
          this.$el = this.view.render().$el;
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should add collapsed class to root element', function() {
          expect(this.view.render().$el).toHaveClass('efc-flags--collapsed');
        });

        it('should render 8 images', function() {
          expect(this.$el.find('img').length).toBe(8);
        });

        it('should have first country with proper css class and country title', function() {
          var firstImg = this.$el.find('img').first();
          expect(firstImg).toHaveClass('pl');
          expect(firstImg.attr('title')).toEqual('Poland');
        });

        it('should render show more link', function() {
          expect(this.$el.find('.efc-flags__toggle-more-label')).toContainText('Show more');
        });

        it('should render show less link', function() {
          expect(this.$el.find('.efc-flags__toggle-less-label')).toContainText('Show less');
        });
      });
    });
  });
});