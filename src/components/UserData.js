import React from 'react';
import PropTypes from 'prop-types';

import { getUserImage } from '../utils';
import { userPropType } from '../common-prop-types';

import FoundTextMarker from './FoundTextMarker';
import FoundPhoneMarker from './FoundPhoneMarker';

const _getMarkedText = (initial, query) => {
	const srcText = typeof initial === 'string' ? initial : `${initial}`;

	if (srcText.indexOf(query) < 0) {
		return initial;
	}
	let start = srcText.toLowerCase().indexOf(query);
	let finish = query.length;

	let markPart = srcText.substr(start, finish);
	let firstPart = srcText.substr(0, start);
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

const UserData = ({ onSelected, user, searchQuery }) => {
	return (
		<tr className="user-data-item" onClick={() => onSelected(user)}>
			<td>
				<img
					src={user.general.avatar} // TODO: add || no avatart image
					alt="User"
					className="user-image"
				/>
			</td>
			<td>
				<FoundTextMarker initial={user.general.firstName} query={searchQuery} />
			</td>
			<td>
				<FoundTextMarker initial={user.general.lastName} query={searchQuery} />
			</td>
			{/* <td>
				<FoundPhoneMarker phone={user.phone} query={searchQuery} />
			</td> */}
		</tr>
	);
};

UserData.propTypes = {
	onSelected: PropTypes.func,
	user: userPropType,
	searchQuery: PropTypes.string
};

export default UserData;