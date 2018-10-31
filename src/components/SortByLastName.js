import React from 'react';
import PropTypes from 'prop-types';

import { concatClassNames } from '../utils';

let order = false;

export function getOptClassName(className, order) {
	return !order ? className : `${className}-alt`;
};

const SortByLastName = ({ onSort }) => {
	const handleClick = (key) => {
		order = !order;
		onSort(key, order);
	};

	return (
		<button
			className="btn btn-info btn-sm"
			type="button"
			onClick={() => handleClick('lastName')}
		>
			<i className={concatClassNames(getOptClassName('glyphicon-sort-by-alphabet', order), 'glyphicon')}></i>
			<span> </span>
			Sort by last name
		</button>
	);
};

SortByLastName.propTypes = {
	onSort: PropTypes.func.isRequired
};

export default SortByLastName;
