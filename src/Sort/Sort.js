import React from 'react';
import { SimpleButton } from '../Button';
import classNames from 'classnames';

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
	const sortClass = classNames('button-inline', { 'button-active': sortKey === activeSortKey });

	return (
		<SimpleButton onClick={() => onSort(sortKey)} className={sortClass}>
			{children}
		</SimpleButton>
	);
};

export default Sort;
