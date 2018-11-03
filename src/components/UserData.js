import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

const UserData = ({ activeUserId, onSelected, user, searchQuery }) => {
	return (
		<tr
			className={classNames("user-data-tr", {
				"user-data-active": user.id === activeUserId
			})}
			onClick={onSelected}
		>
			<td className="user-data-avatar-td">
				<img
					src={user.general.avatar} // TODO: add || src of default image
					alt="User"
					className="user-image"
				/>
			</td>
			<td>
				<FoundTextMarker text={user.general.firstName} query={searchQuery} />
			</td>
			<td>
				<FoundTextMarker text={user.general.lastName} query={searchQuery} />
			</td>
			<td>
				<FoundTextMarker text={user.contact.phone} query={searchQuery} />
			</td>
			{/* <td>
				<FoundPhoneMarker phone={user.phone} query={searchQuery} />
			</td> */}
		</tr>
	);
};

UserData.propTypes = {
	activeUserId: PropTypes.string,
	onSelected: PropTypes.func,
	user: userPropType.isRequired,
	searchQuery: PropTypes.string
};

UserData.defaultProps = {
	activeUserId: PropTypes.string,
	onSelected: () => {},
	searchQuery: '',
};

export default UserData;
