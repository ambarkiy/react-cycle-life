const DEFAULT_QUERY = 'redux',
	PATH_BASE = 'https://hn.algolia.com/api/v1',
	PATH_SEARCH = '/search',
	PARAM_SEARCH = 'query=';

export const URL_TEST = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
