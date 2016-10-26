define(function (require) {
  var $ = require('jquery');
  var PagerComponent = require('app/shared/components/lists/pager/main.component');

  var component = new PagerComponent({
    totalItems: 100,
    pageSize: 10,
    currentPage: 1
  });

  $('.demo__pager').append(component.render().view.el);
});