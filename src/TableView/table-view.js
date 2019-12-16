import React from 'react';
import { sortBy } from 'lodash';
import { Sort } from '../Sort';
import './table-view.css';
import { SimpleButton } from '../Button';

const SORTS = {
	NONE: (list) => list,
	TITLE: (list) => sortBy(list, 'title'),
	AUTHOR: (list) => sortBy(list, 'author'),
	COMMENTS: (list) => sortBy(list, 'num_comments').reverse(),
	POINTS: (list) => sortBy(list, 'points').reverse()
};

const TableView = ({ list, pattern, onDissmiss, sortKey, onSort }) => {
	return (
		<div className='table'>
			<div className='table-header'>
				<span style={{ with: '40%' }}>
					<Sort sortKey={'TITLE'} onSort={onSort}>
						TITLE
					</Sort>
				</span>
			</div>
			<div className='table-header'>
				<span style={{ with: '30%' }}>
					<Sort sortKey={'AUTHOR'} onSort={onSort}>
						AUTHOR
					</Sort>
				</span>
			</div>
			<div className='table-header'>
				<span style={{ with: '10%' }}>
					<Sort sortKey={'COMMENTS'} onSort={onSort}>
						COMMENTS
					</Sort>
				</span>
			</div>
			<div className='table-header'>
				<span style={{ with: '10%' }}>
					<Sort sortKey={'POINTS'} onSort={onSort}>
						POINTS
					</Sort>
				</span>
			</div>
			<div className='table-header'>
				<span style={{ with: '10%' }}>ARCHIVE</span>
			</div>
			{SORTS[sortKey](list).map((item) => (
				<div key={item.objectID} className='table-row'>
					<span>
						<a href={item.url}>{item.title}</a>
					</span>
					<span>{item.author}</span>
					<span>{item.num_comments}</span>
					<span>{item.points}</span>
					<SimpleButton onClick={() => onDissmiss(item.objectID)}>Supprimer</SimpleButton>
				</div>
			))}
		</div>
	);
};

export default TableView;
