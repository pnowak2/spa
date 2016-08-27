define(function(require) {
  return {
    getItems: function() {
      return [{
        id: 'ongoing',
        title: 'Ongoing',
        selected: true
      }, {
        id: 'completed',
        title: 'Completed',
        selected: true
      }, {
        id: 'successStoriesOnly',
        title: 'Success Stories only'
      }, {
        id: 'resultsOnly',
        title: 'with Results only'
      }];
    }
  };
});