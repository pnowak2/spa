define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    ProjectPartnersPageView = require('./projectPartnersPage.view');

  describe('EFC Project Partners View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ProjectPartnersPageView.prototype).toEqual(jasmine.any(Backbone.View));
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
      });
    });
  });
});