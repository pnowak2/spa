define(function (require) {
    var $ = require('jquery');
    var SearchableResultsListComponent = require('app/ce/components/landing-page/results/list/searchable-results-list/main.component');

    var component = new SearchableResultsListComponent();
    component.render().show();

    // perform search by keyword and display results with results stats and pager
    component.onSearchRequest({
        keyword: 'the'
    });

    $('.demo__ce-searchable-results-list').append(component.view.el);
});