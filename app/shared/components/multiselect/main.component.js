define(function(require) {
  var Component = require('app/core/component'),
    MultiselectView = require('./views/multiselect.view');

  return Component.extend({
    initialize: function() {
      this.view = new MultiselectView([{
        id: 'pl',
        title: 'Poland',
        selected: true
      }, {
        id: 'de',
        title: 'Germany',
        selected: false
      }, {
        id: 'be',
        title: 'Belgium',
        selected: true
      }]);
    }
  });
});