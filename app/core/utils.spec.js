define(function(require) {
  var utils = require('./utils');

  describe('Utils', function() {
    describe('api', function() {
      describe('.extend()', function() {

        describe('definition', function() {
          it('should be defined', function() {
            expect(utils.extend).toEqual(jasmine.any(Function));
          });
        });

        describe('function extension result', function() {
          it('should be new function', function() {
            var Extensible = function() {};
            Extensible.extend = utils.extend;

            expect(Extensible.extend()).toEqual(jasmine.any(Function));
          });


          it('should be proto constructor if defined', function() {
            var protoConstructor = function() {},
              Extensible = function() {};

            Extensible.extend = utils.extend;

            var Child = Extensible.extend({
              constructor: protoConstructor
            });

            expect(Child).toBe(protoConstructor);
          });
        });

        describe('extension of static properties', function() {
          var Extensible, Extended;

          beforeEach(function() {
            Extensible = function() {};
            Extensible.fnProperty = 'function static property';

            Extensible.extend = utils.extend;
            Extended = Extensible.extend({}, {
              staticProperty: 'argument static property'
            });
          })

          it('should get static property from parent function', function() {
            expect(Extended.fnProperty).toEqual('function static property');
          });

          it('should get static property from extend arguments', function() {
            expect(Extended.staticProperty).toEqual('argument static property');
          });
        });

        describe('extension of proto properties', function() {
          var Extensible, Extended;

          beforeEach(function() {
            Extensible = function() {};
            Extensible.extend = utils.extend;
            Extended = Extensible.extend({
              protoProp: 'prototype property',
              protoMethod: function() {}
            });
          })

          it('should get proto properties from arguments', function() {
            expect(Extended.prototype.protoProp).toEqual('prototype property');
            expect(Extended.prototype.protoMethod).toEqual(jasmine.any(Function));
          });
        });

        describe('getting super in hierarchy', function() {
          it('should point to parent prototype', function() {
            var Extensible = function() {};
            Extensible.extend = utils.extend;

            var Child = Extensible.extend();

            expect(Child.__super__).toBe(Extensible.prototype);
          });
        });

        describe('creating new instance', function() {
          it('should call parent constructor', function() {
            var parentConstructorSpy = jasmine.createSpy(),
              Extensible = function() {
                parentConstructorSpy.apply(this, arguments);
              };

            Extensible.extend = utils.extend;

            var Child = Extensible.extend();

            expect(parentConstructorSpy).not.toHaveBeenCalled();

            new Child(1, 2, 3);

            expect(parentConstructorSpy).toHaveBeenCalledWith(1, 2, 3);
          });
        });
      });
    });
  });
});