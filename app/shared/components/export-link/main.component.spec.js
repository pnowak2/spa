define(function(require) {
  var Component = require('app/core/component'),
    ExportLinkComponent = require('./main.component'),
    ExportLinkView = require('./views/exportLink.view');

  describe('Export Link Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ExportLinkComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.exportLinkComponent = new ExportLinkComponent;
      });

      it('should be initialized with proper view', function() {
        expect(this.exportLinkComponent.view).toEqual(jasmine.any(ExportLinkView));
      });
    });

    describe('events', function() {
      it('should trigger event on export link click', function(done) {
        var component = new ExportLinkComponent

        component.on('exportLink:click', function() {
          expect(true).toBe(true);
          done();
        });

        component.view.trigger('exportLink:click');
      });
    });
  });
});