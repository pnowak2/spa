define(function(require) {
  var Backbone = require('backbone'),
    router = require('./search.router');

  describe('Search Router', function() {
    beforeEach(function() {
      spyOn(router, 'trigger');
      spyOn(router, 'navigate').and.callThrough();

      try {
        Backbone.history.start();
      } catch (e) {}
    });

    afterEach(function() {
      router.navigate('');
      router.trigger.calls.reset();
      Backbone.history.stop();
    });

    describe('type', function() {
      it('should be of router', function() {
        expect(router).toEqual(jasmine.any(Backbone.Router));
      });
    });

    describe('routes', function() {
      it('searching should trigger router event', function() {
        router.navigate('search/keyword=test', {
          trigger: true
        });

        expect(router.trigger).toHaveBeenCalledWith('router:search', {
          keyword: 'test'
        });
      });
    });

    describe('api', function() {
      describe('.navigate()', function() {
        it('should be defined', function() {
          expect(router.update).toEqual(jasmine.any(Function));
        });

        it('should convert criteria object to proper query string', function() {
          var criteria = {
            keyword: 'foo',
            options: ['a', 'b']
          };

          router.update(criteria);

          expect(router.navigate).toHaveBeenCalledWith('search/keyword=foo&options=a&options=b');
        });
      });
    });
  });
});