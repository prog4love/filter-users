import React from 'react';
import PropTypes from 'prop-types';

const FoundTextMarker = ({ initial, query }) => {
	const srcText = typeof initial === 'string' ? initial : `${initial}`;

	if (srcText.indexOf(query) < 0) {
		return initial;
	}
	let start = srcText.toLowerCase().indexOf(query);
	let finish = query.length;

	let firstPart = srcText.substr(0, start);
	let markPart = srcText.substr(start, finish);
	let lastPart = srcText.substr(start + finish);

	return (
		<span>
			{firstPart}
			<strong style={{color: '#00D8FF'}}>
				{markPart}
			</strong>
			{lastPart}
		</span>
	);
};

FoundTextMarker.propTypes = {
	initial: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	query: PropTypes.string.isRequired,
};

export default FoundTextMarker;