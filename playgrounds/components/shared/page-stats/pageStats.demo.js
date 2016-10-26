define(function (require) {
  var $ = require('jquery');
  var PageStatsComponent = require('app/shared/components/lists/page-stats/main.component');

  var component = new PageStatsComponent({
    displayStartItem: 11,
    displayEndItem: 20,
    totalItems: 162
  });

  $('.demo__page-stats').append(component.render().view.el);
});