define(function (require) {

  var Backbone = require('backbone'),
    SearchboxView = require('app/widgets/search/searchbox/views/searchboxView'),
    Mustache = require('mustache'),
    tpl = require('text!app/widgets/search/searchbox/templates/searchbox.html');

  describe('SearchboxView', function () {
    beforeEach(function () {
      this.view = new SearchboxView;
    });

    describe('prototype', function () {
      it('should be defined', function () {
        expect(SearchboxView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('instance', function () {
      it('should have correct template', function () {
        expect(tpl).toBeMatchedBy('input[type="text"]');
      });

      it('should have model', function () {
        expect(this.view.model).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('render', function () {
      it('should render', function () {
        spyOn(this.view.model, 'toJSON').and.returnValue({
          keyword: 'hello world'
        });

        this.view.render();

        expect(this.view.el.innerHTML).toBeMatchedBy('input[type="text"]');
      });

      it('should serialize model', function () {
        spyOn(this.view.model, 'toJSON').and.returnValue({});
        spyOn(Mustache, 'render');

        this.view.render();

        expect(Mustache.render).toHaveBeenCalledWith(tpl, {});
      });
    });
  });

});