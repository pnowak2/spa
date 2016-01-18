define(function(require) {
  var Backbone = require('backbone'),
    ProjectPopupView = require('./projectPopup.view'),
    ProjectPopupModel = require('../models/projectPopup.model');

  describe('Project Popup View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ProjectPopupView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.className should be defined', function() {
        expect(ProjectPopupView.prototype.className).toEqual('efc-map-popup');
      });
    });

    describe('creation', function() {
      it('should have model defined', function() {
        var view = new ProjectPopupView;

        expect(view.model).toEqual(jasmine.any(ProjectPopupModel));
      });

      it('should initialize model with popup data', function() {
        spyOn(ProjectPopupModel.prototype, 'initialize');

        var fakePopupData = {},
          view = new ProjectPopupView({
            popupData: fakePopupData
          });

        expect(view.model.initialize).toHaveBeenCalledWith(jasmine.objectContaining(fakePopupData));
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ProjectPopupView({
            popupData: {
              id: '52',
              title: 'Project Title',
              description: 'Project Description',
              activity: 'Project Activity',
              coordinator: 'Project Coordinator'
            }
          });

          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render bubble properties', function() {
          expect(this.view.$el).toContainHtml('Project Title');
          expect(this.view.$el).toContainHtml('Project Description');
          expect(this.view.$el).toContainHtml('Project Activity');
          expect(this.view.$el).toContainHtml('Project Coordinator');
        });

        it('should render link to project details', function() {
          var link = this.view.$el.find('.efc-map-popup__more-link');
          expect(link).toHaveAttr('href', '/programmes/europe-for-citizens/projects/efc-project-details-page/?nodeRef=52');
          expect(link).toHaveAttr('target', '_blank');
          expect(link).toContainText('Show project card');
        });
      });
    });
  });
});