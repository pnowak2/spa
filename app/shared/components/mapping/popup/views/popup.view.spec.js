define(function(require) {
  var Backbone = require('backbone'),
    PopupView = require('./popup.view');

  describe('Popup View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PopupView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.className should be defined', function() {
        expect(PopupView.prototype.className).toEqual('efc-map-popup');
      });
    });

    describe('creation', function() {
      it('should throw an exception if the type is not defined', function() {
        expect(function() {
          new PopupView();
        }).toThrowError('Invalid popup type');
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {

        it('should return view itself', function() {
          var view = new PopupView({
            type: 'project',
            data: {}
          });
          expect(view.render()).toBe(view);
        });

        describe('Project', function() {
          beforeEach(function() {
            this.view = new PopupView({
              type: 'project',
              data: {
                id: '52',
                title: 'Project Title',
                description: 'Project Description',
                activity: 'Project Activity',
                coordinator: 'Project Coordinator'
              }
            });

            this.view.render();
          });

          it('should render bubble title', function() {
            expect(this.view.$el).toContainHtml('Project Title');
          });

          it('should render bubble description', function() {
            expect(this.view.$el).toContainHtml('Project Description');
          });

          it('should render bubble activity', function() {
            expect(this.view.$el).toContainHtml('Project Activity');
          });

          it('should render bubble coordinator', function() {
            expect(this.view.$el).toContainHtml('Project Coordinator');
          });

          it('should render link to project details', function() {
            var link = this.view.$el.find('.efc-map-popup__more-link');
            expect(link).toHaveAttr('href', '/programmes/europe-for-citizens/projects/efc-project-details-page/?nodeRef=52');
            expect(link).toHaveAttr('target', '_blank');
            expect(link).toContainText('Show project card');
          });
        });

        describe('Organisation', function() {
          beforeEach(function() {
            this.view = new PopupView({
              type: 'organisation',
              data: {
                id: '52',
                name: 'name',
                type: 'type',
                role: 'role',
                address: 'address',
                website: 'website'
              }
            });

            this.view.render();
          });

          it('should render bubble name property', function() {
            expect(this.view.$el).toContainHtml('name');
          });

          it('should render bubble type property', function() {
            expect(this.view.$el).toContainHtml('type');
          });

          it('should render bubble type property', function() {
            expect(this.view.$el).toContainHtml('role');
          });

          it('should render bubble address property', function() {
            expect(this.view.$el).toContainHtml('address');
          });

          it('should render bubble website properties', function() {
            expect(this.view.$el).toContainHtml('website');
          });

          it('should render link to project details', function() {
            var link = this.view.$el.find('.efc-map-popup__website-link');
            expect(link).toHaveAttr('href', 'website');
            expect(link).toHaveAttr('target', '_blank');
            expect(link).toContainText('website');
          });
        });


      });
    });
  });
});