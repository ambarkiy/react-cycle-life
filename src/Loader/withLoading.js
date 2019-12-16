import React from 'react';
import SimpleTextLoader from './SimpleTextLoader';

const withLoading = (Component) => ({ isLoading, ...rest }) =>
	isLoading ? <SimpleTextLoader /> : <Component {...rest} />;

export default withLoading;
