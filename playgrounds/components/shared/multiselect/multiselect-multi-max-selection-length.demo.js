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
    multiple: true,
    maximumSelectionLength: 1
  };

  var programmesMultiselect = new MultiselectComponent(data, options);

  $('.demo__multiselect--multi-max-selection-length').append(programmesMultiselect.render().view.el);
});
