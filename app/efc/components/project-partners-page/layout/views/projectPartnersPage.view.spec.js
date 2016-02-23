define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    ProjectPartnersPageView = require('./projectPartnersPage.view'),
    PartnersMapComponent = require('app/efc/components/project-partners-page/partners-map/main.component');

  describe('EFC Project Partners View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ProjectPartnersPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(ProjectPartnersPageView.prototype, 'render');
        spyOn(PartnersMapComponent.prototype, 'initMap');

        this.view = new ProjectPartnersPageView;
      });

      it('should have partners map component defined ', function() {
        expect(this.view.partnersMapComponent).toEqual(jasmine.any(PartnersMapComponent));
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });

      it('should init the searchable map', function() {
        expect(this.view.partnersMapComponent.initMap).toHaveBeenCalled();
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('efc.project-partners-page.fixture.html');

          this.view = new ProjectPartnersPageView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render partners map component to appropriate container', function() {
          var markup = this.view.partnersMapComponent.render().view.el;
          expect($('.efc-project-partners-container')).toContainHtml(markup);
        });
      });
    });
  });
});