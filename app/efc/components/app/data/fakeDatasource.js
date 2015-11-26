define(function(require) {
  return {
    tabDescriptors: [{
      title: 'Map',
      identifier: 'map',
      targetSelector: ''
    }, {
      title: 'List',
      identifier: 'list',
      targetSelector: '.efc-searchable-results-list',
      selected: true
    }],
    countries: [{
      id: 'pl',
      title: 'Poland',
      selected: false
    }, {
      id: 'de',
      title: 'Germany',
      selected: false
    }, {
      id: 'be',
      title: 'Belgium',
      selected: false
    }, {
      id: 'lu',
      title: 'Luxembourg',
      selected: false
    }, {
      id: 'es',
      title: 'Spain',
      selected: false
    }],
    activities: [{
      id: 'sr',
      title: 'Strand1: European Remembrance',
      selected: false
    }, {
      id: 'st',
      title: 'Strand2: Better communication',
      selected: false
    }],
    subactivities: [{
      id: 'tt',
      title: 'Town Twinning',
      selected: false
    }, {
      id: 'ls',
      title: 'Less troubles',
      selected: false
    }],
    organisationTypes: [{
      id: 'np',
      title: 'Non Profit',
      selected: false
    }, {
      id: 'cm',
      title: 'Commercial',
      selected: false
    }, {
      id: 'bd',
      title: 'Bare minimal',
      selected: false
    }]
  }
});