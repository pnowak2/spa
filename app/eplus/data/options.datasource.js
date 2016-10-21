define(function (require) {
    return {
        getItems: function () {
            return [{
                id: 'ongoing',
                title: 'Ongoing'
            }, {
                id: 'finalized',
                title: 'Completed'
            }, {
                id: 'goodPracticesOnly',
                title: 'Good Practice examples'
            }, {
                id: 'successStoriesOnly',
                title: 'Success Stories'
            }, {
                id: 'resultsOnly',
                title: 'with Results only'
            }];
        }
    };
});