define(function (require) {
  var $ = require('jquery');
  var ActionsToolbarComponent = require('app/shared/components/other/actions-toolbar/main.component');

  var component = new ActionsToolbarComponent({

  });

  $('.demo__actions-toolbar').append(component.render().view.el);
});