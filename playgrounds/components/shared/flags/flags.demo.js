define(function (require) {
  var $ = require('jquery');
  var FlagsComponent = require('app/shared/components/other/flags/main.component');

  var component = new FlagsComponent([{
    code: 'pl',
    fullName: 'Poland'
  },{
    code: 'de',
    fullName: 'Germany'
  },{
    code: 'be',
    fullName: 'Belgium'
  },{
    code: 'es',
    fullName: 'Spain'
  },{
    code: 'ro',
    fullName: 'Romania'
  },{
    code: 'uk',
    fullName: 'United Kingdom'
  },{
    code: 'cz',
    fullName: 'Czech Republik'
  },{
    code: 'sk',
    fullName: 'Slovakia'
  }]);

  $('.demo__flags').append(component.render().view.el);
});