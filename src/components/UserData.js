import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Highlighter from 'react-highlight-words';

import { userPropType } from '../common-prop-types';
import { findPhoneMatchingChunks } from '../utils';

import FoundTextMarker from './FoundTextMarker';

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
					className="user-data-image"
				/>
			</td>
			<td>
				<FoundTextMarker text={user.general.firstName} query={searchQuery} />
			</td>
			<td>
				<FoundTextMarker text={user.general.lastName} query={searchQuery} />
			</td>
			<td>
				<Highlighter
			    highlightClassName="highlighted-text"
					activeIndex={-1}
			    searchWords={[searchQuery]}
			    autoEscape={true}
					findChunks={findPhoneMatchingChunks}
			    textToHighlight={user.contact.phone}
			  />
			</td>
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
