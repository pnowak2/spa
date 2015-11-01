define(function(require) {
  var PageView = require('app/widgets/pager/views/pageView'),
    PageModel = require('app/widgets/pager/models/pageModel'),
    eventBus = require('app/widgets/pager/events/eventBus');

  describe('Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should throw if created without model', function() {
        expect(function() {
          new PageView
        }).toThrowError('model is not of correct type')
      });

      it('should throw if model type is incorrect', function() {
        expect(function() {
          new PageView({
            model: {}
          })
        }).toThrowError('model is not of correct type')
      });
    });

    describe('properties', function() {
      beforeEach(function() {
        this.view = new PageView({
          model: new PageModel
        })
      });

      it('.tagName', function() {
        expect(this.view.tagName).toEqual('a');
      });

      it('should have href set to #', function() {
        expect(this.view.attributes.href).toEqual('#');
      });
    });

    describe('api', function() {
      describe('.didClickPage', function() {
        it('should be defined', function() {
          expect(PageView.prototype.didClickPage).toEqual(jasmine.any(Function));
        });

        it('should trigger event bus', function() {
          spyOn(eventBus, 'trigger');
          var evt = jasmine.createSpyObj('e', ['preventDefault']),
            view = new PageView({
              model: new PageModel({
                page: 3
              })
            });

          view.didClickPage(evt);

          expect(eventBus.trigger).toHaveBeenCalledWith('pager:page:selected', 3);
          expect(evt.preventDefault).toHaveBeenCalled();
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define click event on view itself', function() {
          spyOn(PageView.prototype, 'didClickPage');

          var view = new PageView({
            model: new PageModel
          });

          view.render().$el.trigger('click');

          expect(view.didClickPage).toHaveBeenCalled();
          expect(view.didClickPage.calls.count()).toBe(1);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new PageView({
            model: new PageModel
          });

          expect(view.render()).toBe(view);
        });

        it('should render unselected anchor with page number', function() {
          var view = new PageView({
            model: new PageModel({
              page: 5,
              selected: false
            })
          });

          expect(view.render().$el).toBeMatchedBy('a[href="#"]');
          expect(view.render().$el).not.toHaveClass('efc-selected');
          expect(view.render().$el).toContainText('5');
        });

        it('should render selected anchor with page number', function() {
          var view = new PageView({
            model: new PageModel({
              page: 2,
              selected: true
            })
          });

          expect(view.render().$el).toBeMatchedBy('a.efc-selected[href="#"]');
          expect(view.render().$el).toContainText('2');
        });
      });
    });
  });
});