define(function (require) {
  var $ = require('jquery');
  var ActionsToolbarComponent = require('app/shared/components/other/actions-toolbar/main.component');

  var component = new ActionsToolbarComponent();

  component.on('actionsToolbar:export:click', function() {
    alert('xls button was clicked !');
  });

  $('.demo__actions-toolbar').append(component.render().view.el);
});