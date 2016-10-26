define(function (require) {
  var $ = require('jquery');
  var SearchComponent = require('app/shared/components/searching/search/main.component');
  var CEAdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component');

  var component = new SearchComponent({
    advancedSearchComponent: new CEAdvancedSearchComponent()
  });

  $('.demo__search').append(component.render().view.el);
});