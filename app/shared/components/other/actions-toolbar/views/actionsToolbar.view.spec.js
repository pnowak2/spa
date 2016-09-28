define(function(require) {
  var Backbone = require('backbone'),
    ActionsToolbar = require('./actionsToolbar.view');

  describe('Actions Toolbar View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ActionsToolbar.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should not throw if created without params', function() {
        expect(function() {
          new ActionsToolbar();
        }).not.toThrow();
      });
    });

    describe('properties', function() {
      it('should have correct class name', function() {
        expect(ActionsToolbar.prototype.className).toEqual('vlr-actions-toolbar');
      });
    });

    describe('api', function() {
      describe('.didClickExportLink()', function() {
        beforeEach(function() {
          spyOn(ActionsToolbar.prototype, 'trigger');
          this.fakeEvent = jasmine.createSpyObj('fake event', ['preventDefault']);
          this.view = new ActionsToolbar();
        });

        it('should be defined', function() {
          expect(ActionsToolbar.prototype.didClickExportLink).toEqual(jasmine.any(Function));
        });

        it('should prevent default action', function() {
          this.view.didClickExportLink(this.fakeEvent);

          expect(this.fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should trigger export link event', function() {
          this.view.didClickExportLink(this.fakeEvent);
          expect(this.view.trigger).toHaveBeenCalledWith('actionsToolbar:export:click');
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(ActionsToolbar.prototype.events).toEqual({
            'click .vlr-actions-toolbar__export': 'didClickExportLink'
          });
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ActionsToolbar();
          this.$el = this.view.render().$el;
        });

        it('should return view object', function() {
          var view = new ActionsToolbar();

          expect(view.render()).toBe(view);
        });

        describe('Export Link Element', function() {
          it('should contain element', function() {
            expect(this.$el).toContainElement('a.vlr-actions-toolbar__export');
          });

          it('should contain proper text', function() {
            expect(this.$el.find('a.vlr-actions-toolbar__export')).toHaveText('Download as Excel');
          });

          it('should contain proper anchor', function() {
            expect(this.$el.find('a.vlr-actions-toolbar__export')).toHaveAttr('href', '#');
          });
        });
      });
    });
  });
});