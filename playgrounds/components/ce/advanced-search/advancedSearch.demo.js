define(function (require) {
  var $ = require('jquery');
  var AdvancedSearch = require('app/ce/components/landing-page/searching/advanced-search/main.component');

  var component = new AdvancedSearch();

  // Normally its hidden, showing it and setting position to something which is not absolute   
  $('.demo__ce-advanced-search').append(component.render().show().view.$el.css('position', 'static'));
});
