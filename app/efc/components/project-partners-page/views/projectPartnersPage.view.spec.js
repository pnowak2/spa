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
  });
});