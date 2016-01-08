define(function(require) {
  var ProjectPopupModel = require('./projectPopup.model');

  describe('Project Popup Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(ProjectPopupModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(ProjectPopupModel.prototype.defaults).toEqual({
          id: '',
          title: '',
          activity: '',
          coordinator: '',
          summary: ''
        });
      });
    });
  });
});