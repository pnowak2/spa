define(function(require) {
  var PageView = require('./page.view'),
    PageModel = require('../models/page.model');

  describe('Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should throw if model type is incorrect', function() {
        expect(function() {
          new PageView({
            model: {}
          })
        }).toThrowError('model is not of correct type')
      });
    });

    describe('properties', function() {
      it('.tagName', function() {
        expect(PageView.prototype.tagName).toEqual('a');
      });

      it('.className should be defined', function() {
        expect(PageView.prototype.className).toEqual('efc-pager__page');
      });

      it('href - should have href set to #', function() {
        expect(PageView.prototype.attributes.href).toEqual('#');
      });
    });

    describe('api', function() {
      describe('.didClickPage', function() {
        beforeEach(function() {
          this.evt = jasmine.createSpyObj('e', ['preventDefault']);
          this.view = new PageView({
            model: new PageModel({
              page: 3
            })
          });
        });

        it('should be defined', function() {
          expect(PageView.prototype.didClickPage).toEqual(jasmine.any(Function));
        });

        it('should trigger model event', function() {
          spyOn(this.view.model, 'trigger');

          this.view.didClickPage(this.evt);

          expect(this.view.model.trigger).toHaveBeenCalledWith('page:selection-request', 3);
        });

        it('should prevent default', function() {
          this.view.didClickPage(this.evt);
          expect(this.evt.preventDefault).toHaveBeenCalled();
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(PageView.prototype.events).toEqual({
            'click': 'didClickPage'
          });
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
          expect(view.render().$el).not.toHaveClass('efc-pager__page--selected');
          expect(view.render().$el).toContainText('5');
        });

        it('should render selected anchor with page number', function() {
          var view = new PageView({
            model: new PageModel({
              page: 2,
              selected: true
            })
          });

          expect(view.render().$el).toBeMatchedBy('a.efc-pager__page--selected[href="#"]');
          expect(view.render().$el).toContainText('2');
        });
      });
    });
  });
});