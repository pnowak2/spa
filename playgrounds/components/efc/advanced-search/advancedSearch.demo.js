define(function (require) {
  var $ = require('jquery');
  var AdvancedSearch = require('app/efc/components/landing-page/searching/advanced-search/main.component');

  var component = new AdvancedSearch();

  // Normally its hidden, showing it and setting position to something which is not absolute   
  $('.demo__efc-advanced-search').append(component.render().show().view.$el.css('position', 'static'));
});
