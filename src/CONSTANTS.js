const URL_HELPER = {
	DEFAULT_QUERY: 'redux',
	PATH_BASE: 'https://hn.algolia.com/api/v1',
	PATH_SEARCH: '/search',
	PARAM_SEARCH: 'query='
};
export default URL_HELPER;

export const URL_TEST = `${URL_HELPER.PATH_BASE}${URL_HELPER.PATH_SEARCH}?${URL_HELPER.PARAM_SEARCH}${URL_HELPER.DEFAULT_QUERY}`;
