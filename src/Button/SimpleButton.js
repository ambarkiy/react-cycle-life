import React from 'react';

const SimpleButton = ({ children, onClick }) => <button onClick={onClick}>{children}</button>;

export default SimpleButton;
