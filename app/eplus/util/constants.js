define(function(require) {
  return {
    urls: {
      'SEARCH_MAP': '/programmes/service/es/search/clustermap'
    },
    ccm: {
      'ERASMUS_PLUS': '31046216'
    }, 
    options: {
    	'ONGOING': 'ongoing',
    	'COMPLETED':'finalized',
    	'SUCCESS_STORIES': 'successStoriesOnly',
    	'RESULTS': 'resultsOnly',
    	'GOOD_PRACTICE':'goodPracticesOnly'
    }

  };
});