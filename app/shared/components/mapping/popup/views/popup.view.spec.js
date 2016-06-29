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
        expect(PopupView.prototype.className).toEqual('vlr-map-popup');
      });
    });

    describe('creation', function() {
      it('should throw an exception if the type is not defined', function() {
        expect(function() {
          new PopupView;
        }).toThrowError('Invalid popup type');
      });

      it('should throw an exception if the type is not allowed', function() {
        expect(function() {
          new PopupView({
            type: 'mariquita'
          });
        }).toThrowError('Invalid popup type');
      });
    });

    describe('api', function() {
      describe('.externalizeLinks()', function() {
        beforeEach(function() {
          this.view = new PopupView({
            type: PopupView.prototype.allowedTypes[0],
            data: {}
          });
        });

        it('should be defined', function() {
          expect(PopupView.prototype.externalizeLinks).toEqual(jasmine.any(Function));
        });

        it('should externalize links marked with proper attribute', function() {
          this.view.$el = $('<div><a href="google.com" rel="external">link</a></div>');
          this.view.externalizeLinks();

          expect(this.view.$el.find('a').first().attr('href')).toEqual('http://google.com');
        });

        it('should not externalize links not marked', function() {
          this.view.$el = $('<div><a href="/my/site">link</a></div>');
          this.view.externalizeLinks();

          expect(this.view.$el.find('a').first().attr('href')).toEqual('/my/site');
        });

        it('should not externalize links already externalized with http', function() {
          this.view.$el = $('<div><a href="http://google.pl">link</a></div>');
          this.view.externalizeLinks();

          expect(this.view.$el.find('a').first().attr('href')).toEqual('http://google.pl');
        });

        it('should not externalize links already externalized with https', function() {
          this.view.$el = $('<div><a href="https://google.be">link</a></div>');
          this.view.externalizeLinks();

          expect(this.view.$el.find('a').first().attr('href')).toEqual('https://google.be');
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          spyOn(PopupView.prototype, 'externalizeLinks');

          this.view = new PopupView({
            type: 'efc-project',
            data: {}
          });
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should externalize links', function() {
          this.view.render();
          expect(this.view.externalizeLinks).toHaveBeenCalled();
        });

        describe('Eplus Project', function() {
          describe('All data present', function() {
            beforeEach(function() {
              this.view = new PopupView({
                type: 'eplus-project',
                data: {
                  id: '52',
                  badges: 'Good Practice & Success Story',
                  programme: 'Erasmus+',
                  title: 'Project Title',
                  actionType: 'Project Action Type',
                  coordinator: 'Project Coordinator',
                  countries: 'PL, DE, BE'
                }
              });

              this.view.render();
            });

            it('should render bubble programme', function() {
              expect(this.view.$el).toContainHtml('Erasmus+');
            });

            it('should render bubble title', function() {
              expect(this.view.$el).toContainHtml('Project Title');
            });

            it('should render good practice and success story', function() {
              expect(this.view.$el).toContainHtml('Good Practice & Success Story');
            });

            it('should render bubble action type', function() {
              expect(this.view.$el).toContainHtml('Project Action Type');
            });

            it('should render bubble coordinator', function() {
              expect(this.view.$el).toContainHtml('Project Coordinator');
            });

            it('should render bubble countries', function() {
              expect(this.view.$el).toContainHtml('PL, DE, BE');
            });

            it('should render link to project details', function() {
              var link = this.view.$el.find('.vlr-map-popup__more-link');
              expect(link).toHaveAttr('href', '/programmes/erasmus-plus/projects/eplus-project-details-page/?nodeRef=52');
              expect(link).toHaveAttr('target', '_blank');
              expect(link).toContainText('Show project card');
            });
          });

          describe('Missing sections', function() {
            beforeEach(function() {
              this.view = new PopupView({
                type: 'eplus-project',
                data: {}
              });

              this.view.render();
            });

            it('should not render title section', function() {
              expect(this.view.$el).not.toContainElement('.vlr-map-popup__title');
            });

            it('should not render badges section', function() {
              expect(this.view.$el).not.toContainElement('.vlr-map-popup__badges');
            });

            it('should not render programme section', function() {
              expect(this.view.$el).not.toContainHtml('Programme:');
            });

            it('should not render action type section', function() {
              expect(this.view.$el).not.toContainHtml('Action Type:');
            });

            it('should not render coordinator section', function() {
              expect(this.view.$el).not.toContainHtml('Coordinator:');
            });

            it('should not render countries section', function() {
              expect(this.view.$el).not.toContainHtml('Countries:');
            });

            it('should not render link section', function() {
              expect(this.view.$el).not.toContainElement('.vlr-map-popup__link');
            });
          });
        });

        describe('EfC Project', function() {
          describe('All data present', function() {
            beforeEach(function() {
              this.view = new PopupView({
                type: 'efc-project',
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
              var link = this.view.$el.find('.vlr-map-popup__more-link');
              expect(link).toHaveAttr('href', '/programmes/europe-for-citizens/projects/efc-project-details-page/?nodeRef=52');
              expect(link).toHaveAttr('target', '_blank');
              expect(link).toContainText('Show project card');
            });
          });

          describe('Missing sections', function() {
            beforeEach(function() {
              this.view = new PopupView({
                type: 'efc-project',
                data: {}
              });

              this.view.render();
            });

            it('should not render title section', function() {
              expect(this.view.$el).not.toContainElement('.vlr-map-popup__title');
            });

            it('should not render activity section', function() {
              expect(this.view.$el).not.toContainHtml('Activity:');
            });

            it('should not render coordinator section', function() {
              expect(this.view.$el).not.toContainHtml('Coordinator:');
            });

            it('should not render description section', function() {
              expect(this.view.$el).not.toContainElement('.vlr-map-popup__description');
            });

            it('should not render link section', function() {
              expect(this.view.$el).not.toContainElement('.vlr-map-popup__link');
            });
          });
        });

        describe('EfC Organisation', function() {
          beforeEach(function() {
            this.view = new PopupView({
              type: 'efc-organisation',
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

          it('should render bubble role property', function() {
            expect(this.view.$el).toContainHtml('role');
          });

          it('should render bubble address property', function() {
            expect(this.view.$el).toContainHtml('address');
          });

          it('should render bubble website properties', function() {
            expect(this.view.$el).toContainHtml('website');
          });

          it('should not render website placeholder', function() {
            expect(this.view.$el).not.toContainText('(Website not provided)');
          });

          it('should render proper bubble website', function() {
            var link = this.view.$el.find('.vlr-map-popup__website-link');
            expect(link).toHaveAttr('href', 'website');
            expect(link).toHaveAttr('target', '_blank');
            expect(link).toHaveAttr('rel', 'external');
            expect(link).toContainText('website');
          });

          it('should show website placeholder if website is not provided', function() {
            var view = new PopupView({
              type: 'efc-organisation',
              data: {
                name: 'name',
                type: 'type',
                role: 'role',
                address: 'address'
              }
            });

            view.render();

            expect(view.$el).not.toContainElement('.vlr-map-popup__website-link');
            expect(view.$el).toContainText('(Website not provided)');
          });
        });
      });
    });
  });
});