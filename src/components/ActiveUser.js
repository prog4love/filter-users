import React from 'react';
import PropTypes from 'prop-types';

import * as Utils from '../utils';
import { userPropType } from '../common-prop-types';

import FoundTextMarker from './FoundTextMarker';

const ActiveUser = ({ user, searchQuery }) => {
		const { general, address = {}, contact = {}, job = {} } = user;

		let optClassName = Object.keys(user).length ? '' : 'hide';

		return (
			<div className={Utils.concatClassNames(optClassName, 'panel', 'panel-default')}>
				<div className="active-user-spacer-cover" />
				{general && (
					<div className="panel-heading text-center">
						{<FoundTextMarker text={general.firstName} query={searchQuery} />}
						{general.firstName && general.lastName ? ' ' : ''}
						{<FoundTextMarker text={general.lastName} query={searchQuery} />}
					</div>
				)}
				<div className="active-user-preview panel-body">
					{general && general.avatar && (
						<div className="text-center">
							<img
								src={general.avatar}
								alt="Selected User"
								className="active-user-image"
							/>
						</div>
					)}
					<ul className="active-user-info list-group">
						<li className="list-group-item"><b>City: </b>
							{<FoundTextMarker text={address.city} query={searchQuery} />}
						</li>
						<li className="list-group-item"><b>Country: </b>
							{<FoundTextMarker text={address.country} query={searchQuery} />}
						</li>
						<li className="list-group-item"><b>Street: </b>
							{<FoundTextMarker text={address.street} query={searchQuery} />}
						</li>
						<li className="list-group-item"><b>Zip Code: </b>
							{<FoundTextMarker text={address.zipCode} query={searchQuery} />}
						</li>
						<hr className="active-user-hr" />
						<li className="list-group-item"><b>Email: </b>
							{<FoundTextMarker text={contact.email} query={searchQuery} />}
						</li>
						<li className="list-group-item"><b>Phone: </b>
							{<FoundTextMarker text={contact.phone} query={searchQuery} />}
						</li>
						<hr className="active-user-hr" />
						<li className="list-group-item"><b>Company: </b>
							{<FoundTextMarker text={job.company} query={searchQuery} />}
						</li>
						<li className="list-group-item"><b>Position: </b>
							{<FoundTextMarker text={job.title} query={searchQuery} />}
						</li>
					</ul>
				</div>
				<div className="active-user-spacer-cover" />
			</div>
		);
}

ActiveUser.propTypes = {
	user: userPropType.isRequired,
	searchQuery: PropTypes.string,
};

ActiveUser.defaultProps = {
	searchQuery: '',
};

export default ActiveUser;
