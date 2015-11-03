define(function(require) {
  var TabSwitcherView = require('app/widgets/tab-switcher/views/tabSwitcherView'),
    eventBus = require('app/widgets/tab-switcher/events/eventBus');

  describe('Tab Switcher View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(TabSwitcherView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should be possible to create with proper configuration', function() {
        expect(function() {
          new TabSwitcherView({
            configuration: [{
              title: 'List',
              identifier: 'list'
            }, {
              title: 'Map',
              identifier: 'map'
            }]
          });
        }).not.toThrow();
      });

      it('should throw if created without tabs configuration', function() {
        expect(function() {
          new TabSwitcherView;
        }).toThrowError('No tabs configuration provided');
      });
    });

    xdescribe('rendering', function() {
      describe('.render()', function() {
        it('should behave...', function() {
          var view = new TabSwitcherView({
            configuration: [{
              title: 'List',
              identifier: 'list'
            }, {
              title: 'Map',
              identifier: 'map'
            }]
          });

          view.render();

          expect(view.$el.html()).toEqual('');
        });
      });
    });
  });
});