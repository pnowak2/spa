define(function (require) {
  var $ = require('jquery');
  var MultiselectComponent = require('app/shared/components/other/multiselect/main.component');

  var data = [{
    id: 1,
    title: 'Programme 1',
    selected: true
  }, {
    id: 2,
    title: 'Programme 2',
    selected: true
  }];

  var options = {
    placeholder: 'All Programmes',
    multiple: true
  };

  var component = new MultiselectComponent(data, options);

  $('.demo__multiselect--multi').append(component.render().view.el);
});