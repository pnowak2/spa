define(function (require) {
  var Component = require('app/core/component'),
    LandingPageView = require('./views/landingPage.view'),
    LandingPageComponent = require('./main.component');

  describe('Eplus Landing Page Component', function () {
    describe('type', function () {
      it('should be of component', function () {
        expect(LandingPageComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function () {
      it('should have proper view defined', function () {
        var component = new LandingPageComponent();
        expect(component.view).toEqual(jasmine.any(LandingPageView));
      });
    });
  });
});