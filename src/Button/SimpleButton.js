import React from 'react';
import './simple-button.css';

const SimpleButton = ({ children, onClick }) => <button onClick={onClick}>{children}</button>;

export default SimpleButton;
