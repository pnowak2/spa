define(function(require) {
  var TabView = require('app/widgets/tab-switcher/views/tab.view'),
    TabModel = require('app/widgets/tab-switcher/models/tab.model');

  describe('Tab Switcher Tab View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(TabView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should throw if created without model', function() {
        expect(function() {
          new TabView
        }).toThrowError('model is not of correct type')
      });

      it('should throw if model type is incorrect', function() {
        expect(function() {
          new TabView({
            model: {}
          })
        }).toThrowError('model is not of correct type')
      });
    });

    describe('properties', function() {
      it('.tagName', function() {
        expect(TabView.prototype.tagName).toEqual('li');
      });
    });

    describe('api', function() {
      describe('.didClickTab', function() {
        beforeEach(function() {
          this.view = new TabView({
            model: new TabModel({
              identifier: 'id-foo'
            })
          });
        });

        it('should be defined', function() {
          expect(TabView.prototype.didClickTab).toEqual(jasmine.any(Function));
        });

        it('should trigger model event', function() {
          spyOn(this.view.model, 'trigger');

          this.view.didClickTab(this.evt);

          expect(this.view.model.trigger).toHaveBeenCalledWith('tab:selection-request', 'id-foo');
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define proper events', function() {
          expect(TabView.prototype.events).toEqual({
            'click': 'didClickTab'
          });
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new TabView({
            model: new TabModel
          });

          expect(view.render()).toBe(view);
        });

        it('should render unselected tab', function() {
          var view = new TabView({
            model: new TabModel({
              title: 'My Tab',
              identifier: 'mytab',
              selected: false
            })
          });

          expect(view.render().$el).toBeMatchedBy('li');
          expect(view.render().$el).not.toHaveClass('efc-selected');
          expect(view.render().$el).toContainText('My Tab');
        });

        it('should render selected tab', function() {
          var view = new TabView({
            model: new TabModel({
              title: 'My Tab',
              identifier: 'mytab',
              selected: true
            })
          });

          expect(view.render().$el).toBeMatchedBy('li.efc-selected');
          expect(view.render().$el).toContainText('My Tab');
        });
      });
    });
  });
});