define(function(require) {
  var ExportLinkView = require('./exportLink.view');

  describe('Export Link View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ExportLinkView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should not throw if created without params', function() {
        expect(function() {
          new ExportLinkView;
        }).not.toThrow();
      });
    });

    describe('properties', function() {
      it('should have correct class name', function() {
        expect(ExportLinkView.prototype.className).toEqual('vlr-export-link');
      });
    });

    describe('api', function() {
      describe('.didClickExportLink()', function() {
        beforeEach(function() {
          spyOn(ExportLinkView.prototype, 'trigger');
          this.fakeEvent = jasmine.createSpyObj('fake event', ['preventDefault']);
          this.view = new ExportLinkView;
        });

        it('should be defined', function() {
          expect(ExportLinkView.prototype.didClickExportLink).toEqual(jasmine.any(Function));
        });

        it('should prevent default action', function() {
          this.view.didClickExportLink(this.fakeEvent);

          expect(this.fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should trigger export link event', function() {
          this.view.didClickExportLink(this.fakeEvent);
          expect(this.view.trigger).toHaveBeenCalledWith('exportLink:click');
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(ExportLinkView.prototype.events).toEqual({
            'click .vlr-export-link__button': 'didClickExportLink'
          });
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ExportLinkView;
          this.$el = this.view.render().$el;
        });

        it('should return view object', function() {
          var view = new ExportLinkView;

          expect(view.render()).toBe(view);
        });

        describe('Export Link Element', function() {
          it('should contain element', function() {
            expect(this.$el).toContainElement('a.vlr-export-link__button');
          });

          it('should contain proper text', function() {
            expect(this.$el.find('a.vlr-export-link__button')).toHaveText('Download list as Excel');
          });

          it('should contain proper anchor', function() {
            expect(this.$el.find('a.vlr-export-link__button')).toHaveAttr('href', '#');
          });
        });
      });
    });
  });
});