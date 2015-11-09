define(function(require) {
  var Backbone = require('backbone'),
    ResultItemView = require('app/widgets/results/results-list/views/resultItemView'),
    ResultModel = require('app/widgets/results/results-list/models/resultModel');

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

    describe('rendering', function() {
      beforeEach(function() {
        this.view = new ResultItemView({
          model: new ResultModel({
            id: '52',
            title: 'Europe for Citizens',
            description: 'Mapping platform',
            startYear: '2015',
            countries: ['pl', 'de', 'lu']
          })
        });

        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        describe('Name of the group', function() {
          it('should return view itself', function() {
            expect(this.view.render()).toBe(this.view)
          });

          it('should render 4 table columns', function() {
            expect(this.$el.find('td')).toHaveLength(4);
          });
        });

        describe('first column', function() {
          it('should contain link to result card', function() {
            var $td = this.$el.find('td').first();
            expect($td).toContainElement('a[href="/programmes/erasmus-plus/projects/eplus-project-details-page/?nodeRef=52"]');
          });

          it('should have link to result card which opens in new window', function() {
            var $td = this.$el.find('td').first();
            expect($td).toContainElement('a[target="_blank"]');
          });

          it('should render title', function() {
            var $td = this.$el.find('td a').first();
            expect($td).toHaveText('Europe for Citizens');
          });
        });

        describe('second column', function() {
          it('should render description', function() {
            var $td = this.$el.find('td').eq(1);
            expect($td).toHaveText('Mapping platform');
          });
        });

        describe('third column', function() {
          it('should render year', function() {
            var $td = this.$el.find('td').eq(2);
            expect($td).toHaveText('2015');
          });
        });

        describe('fourth column', function() {
          it('should render countriesn', function() {
            var $td = this.$el.find('td').last();
            expect($td.find('img')).toHaveLength(3);
          });
        });
      });
    });
  });
});