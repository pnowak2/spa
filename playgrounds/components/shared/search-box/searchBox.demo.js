define(function (require) {
  var $ = require('jquery');
  var SearchBoxComponent = require('app/shared/components/searching/search-box/main.component');

  var component = new SearchBoxComponent();

  $('.demo__search-box').append(component.render().view.el);
});