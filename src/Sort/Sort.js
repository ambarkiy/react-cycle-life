import React from 'react';
import { SimpleButton } from '../Button';

const Sort = ({ sortKey, onSort, children }) => <SimpleButton onClick={() => onSort(sortKey)}>{children}</SimpleButton>;

export default Sort;
