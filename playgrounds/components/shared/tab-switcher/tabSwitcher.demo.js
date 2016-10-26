define(function (require) {
  var $ = require('jquery');
  var TabSwitcherComponent = require('app/shared/components/other/tab-switcher/main.component');

  var component = new TabSwitcherComponent({
    tabDescriptors: [{
      title: 'List view',
      identifier: 'list',
      targetSelector: '.tab1',
      selected: true
    }, {
      title: 'Map',
      identifier: 'map',
      targetSelector: '.tab2',
      selected: false
    }]
  });

  $('.demo__tab-switcher').append(component.render().view.el);
});