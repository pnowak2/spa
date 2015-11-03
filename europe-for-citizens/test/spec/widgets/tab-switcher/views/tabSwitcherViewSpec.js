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

      it('should throw if created with empty tabs configuration', function() {
        expect(function() {
          new TabSwitcherView({
            configuration: []
          });
        }).toThrowError('No tabs configuration provided');
      });

      it('should throw if configuration is incomplete', function() {
        expect(function() {
          new TabSwitcherView({
            configuration: [{
              identifier: 'map'
            }]
          });
        }).toThrowError('At least one tab descriptor is incomplete');

        expect(function() {
          new TabSwitcherView({
            configuration: [{
              title: 'Map'
            }]
          });
        }).toThrowError('At least one tab descriptor is incomplete');
      });
    });
  });
});