define(function(require) {
  var Backbone = require('backbone'),
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    PagerView = require('app/widgets/pager/views/pagerView');

  describe('Pager View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagerView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.view = new PagerView({
          model: new PagerModel
        })
      })

      it('should throw if created without model', function() {
        expect(function() {
          new PagerView
        }).toThrowError('view should be created with model')
      });

      it('should throw if model type is not correct', function() {
        expect(function() {
          new PagerView({
            model: {}
          })
        }).toThrowError('model is not of correct type')
      });

      it('should view element be a div', function() {
        expect(this.view.tagName).toEqual('div');
      });

      it('should view element have a proper css class', function() {
        expect(this.view.className).toEqual('efc-pager');
      });
    });

    describe('api', function() {

    });

    describe('rendering', function() {

    });

    describe('events', function() {

    });
  });
});