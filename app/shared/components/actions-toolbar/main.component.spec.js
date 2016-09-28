define(function(require) {
  var Component = require('app/core/component'),
    ActionsToolbarComponent = require('./main.component'),
    ActionsToolbarView = require('./views/actionsToolbar.view');

  describe('Actions Toolbar Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ActionsToolbarComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.exportLinkComponent = new ActionsToolbarComponent;
      });

      it('should be initialized with proper view', function() {
        expect(this.exportLinkComponent.view).toEqual(jasmine.any(ActionsToolbarView));
      });
    });

    describe('events', function() {
      it('should trigger event on export link click', function(done) {
        var component = new ActionsToolbarComponent

        component.on('actionsToolbar:export:click', function() {
          expect(true).toBe(true);
          done();
        });

        component.view.trigger('actionsToolbar:export:click');
      });
    });
  });
});