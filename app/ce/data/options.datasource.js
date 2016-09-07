define(function(require) {
  return {
    getItems: function() {
      return [{
        id: 'ongoing',
        title: 'Ongoing'
      }, {
        id: 'finalized',
        title: 'Completed'
      }, {
        id: 'successStoriesOnly',
        title: 'Success Stories only'
      }/*, {
        id: 'resultsOnly',
        title: 'with Results only',
        disabled: true
      }*/];
    }
  };
});