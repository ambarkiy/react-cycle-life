import React from 'react';
const isSearched = (pattern) => (item) => item.toLowercase().includes(pattern.toLowercase());

const TableView = ({ list, pattern, onDissmiss }) => {
	return list.map((item) => (
		<div key={item.objectID}>
			<button onClick={() => onDissmiss(item.objectID)}>Supprimer</button>
			<span>{item.title}</span>
			<span>{item.author}</span>
			<span>{item.created_at}</span>
			<span>{item.author}</span>
		</div>
	));
};

export default TableView;
