import React from 'react';
import './simple-button.css';

const SimpleButton = ({ children, onClick, className }) => (
	<button onClick={onClick} className={className}>
		{children}
	</button>
);

export default SimpleButton;
