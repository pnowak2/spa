define(function(require) {
  var Backbone = require('backbone'),
    ResultItemView = require('./resultItem.view'),
    ResultModel = require('../models/result.model'),
    FlagsComponent = require('app/shared/components/flags/main.component');

  describe('Result List Item View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ResultItemView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should throw if created without model', function() {
        expect(function() {
          new ResultItemView;
        }).toThrowError('model is not of correct type')
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be tr', function() {
          expect(ResultItemView.prototype.tagName).toEqual('tr');
        });
      });
    });

    describe('api', function() {
      describe('.createFlagsComponent()', function() {
        beforeEach(function() {
          this.view = new ResultItemView({
            model: new ResultModel
          });

          spyOn(FlagsComponent.prototype, 'initialize').and.callThrough();
          spyOn(this.view.model, 'toJSON').and.returnValue({
            countries: 'fake countries'
          });
        });

        it('should be defined', function() {
          expect(ResultItemView.prototype.createFlagsComponent).toEqual(jasmine.any(Function));
        });

        it('should return flags component', function() {
          expect(this.view.createFlagsComponent()).toEqual(jasmine.any(FlagsComponent));
        });

        it('should initialize flags component with countries from model', function() {
          expect(this.view.createFlagsComponent().initialize).toHaveBeenCalledWith('fake countries');
        });
      });
    });

    describe('rendering', function() {
      beforeEach(function() {
        this.view = new ResultItemView({
          model: new ResultModel({
            id: '53',
            title: 'Europe for Citizens',
            description: 'Mapping platform',
            callYear: '2015',
            countries: [{
              code: 'pl',
              fullName: 'Poland'
            }, {
              code: 'lu',
              fullName: 'Luxembourg'
            }]
          })
        });

        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view)
        });

        it('should render 4 table columns', function() {
          expect(this.$el.find('td')).toHaveLength(4);
        });

        describe('first column', function() {
          beforeEach(function() {
            this.$td = this.$el.find('td').first();
          });

          it('should contain link to result card', function() {
            expect(this.$td).toContainElement('a[href="/programmes/europe-for-citizens/projects/efc-project-details-page/?nodeRef=53"]');
          });

          it('should have link to result card which opens in new window', function() {
            expect(this.$td).toContainElement('a[target="_blank"]');
          });

          it('should contain link with title', function() {
            var $link = this.$td.find('a').first();
            expect($link).toHaveText('Europe for Citizens');
          });
        });

        describe('second column', function() {
          it('should contain description', function() {
            var $td = this.$el.find('td').eq(1);
            expect($td).toHaveText('Mapping platform');
          });
        });

        describe('third column', function() {
          it('should contain year', function() {
            var $td = this.$el.find('td').eq(2);
            expect($td).toHaveText('2015');
          });
        });

        describe('fourth column', function() {
          beforeEach(function() {
            this.$td = this.$el.find('td').last();
          });

          it('should have proper class name', function() {
            expect(this.$td).toHaveClass('efc-results-table__countries');
          });

          it('should render flags component inside', function() {
            var flags = new FlagsComponent([{
              code: 'pl',
              fullName: 'Poland'
            }, {
              code: 'lu',
              fullName: 'Luxembourg'
            }]);

            expect(this.$td).toContainHtml(flags.render().view.$el);
          });
        });
      });
    });
  });
});