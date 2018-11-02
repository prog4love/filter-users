import React from 'react';
import PropTypes from 'prop-types';

const FoundTextMarker = ({ text, query: searchQuery }) => {
	const lowercasedText = text.toLowerCase();
	const query = searchQuery.trim().toLowerCase();

	if (text === '') {
		return text;
	}
	const startIndex = lowercasedText.indexOf(query);

	if (query === '' || startIndex < 0) {
		return <span>{text}</span>;
	}
	const markEnd = query.length;

	const firstPart = text.substr(0, startIndex);
	const markPart = text.substr(startIndex, markEnd);
	const lastPart = text.substr(startIndex + markEnd);

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
	text: PropTypes.string,
	query: PropTypes.string,
};

FoundTextMarker.defaultProps = {
	text: '',
	query: '',
};

export default FoundTextMarker;
