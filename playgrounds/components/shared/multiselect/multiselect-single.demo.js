define(function (require) {
  var $ = require('jquery');
  var MultiselectComponent = require('app/shared/components/other/multiselect/main.component');

  var data = [{
    id: 1,
    title: 'Programme 1',
    selected: true
  }, {
    id: 2,
    title: 'Programme 2'
  }];

  var options = {
    placeholder: 'All Programmes',
    multiple: false
  };

  var multiselect = new MultiselectComponent(data, options);

  $('.demo__multiselect--single').append(multiselect.render().view.el);
});