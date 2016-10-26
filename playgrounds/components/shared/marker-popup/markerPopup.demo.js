define(function (require) {
    var $ = require('jquery');
    var PopupComponent = require('app/shared/components/mapping/popup/main.component');

    var efcProjectPopup = new PopupComponent({
        type: 'efc-project',
        data: {
            id: '52',
            title: 'EfC Project Title',
            description: 'EfC Description text for the popup supporting long text and parapgraphs',
            activity: 'Project Activity',
            coordinator: 'Project Coordinator',
            notAccurate: true
        }
    });

    var ceProjectPopup = new PopupComponent({
        type: 'ce-project',
        data: {
            id: '52',
            title: 'CE Project Title',
            badges: 'Success Story',
            programme: 'Creative Europe',
            action: 'Media Video',
            coordinator: 'Project Coordinator',
            startDate: '2012',
            endDate: '2016',
            notAccurate: true
        }
    });

    var eplusProjectPopup = new PopupComponent({
        type: 'eplus-project',
        data: {
            id: '52',
            badges: 'Good Practice & Success Story',
            programme: 'Erasmus+',
            title: 'Eplus Project Title',
            actionType: 'Project Action Type',
            coordinator: 'Project Coordinator',
            countries: 'PL, DE, BE',
            notAccurate: true
        }
    });

    var efcOrganisationPopup = new PopupComponent({
        type: 'efc-organisation',
        data: {
            id: '52',
            type: 'Organisation Type',
            name: 'EfC Organisation',
            role: 'Organisation Role',
            address: 'Organisation Address',
            website: 'www.cabron.es/',
            notAccurate: true
        }
    });

    $('.demo__marker-popup').append(efcProjectPopup.render().view.el);
    $('.demo__marker-popup').append('<br/>');
    $('.demo__marker-popup').append(ceProjectPopup.render().view.el);
    $('.demo__marker-popup').append('<br/>');
    $('.demo__marker-popup').append(eplusProjectPopup.render().view.el);
    $('.demo__marker-popup').append('<br/>');
    $('.demo__marker-popup').append(efcOrganisationPopup.render().view.el);
});