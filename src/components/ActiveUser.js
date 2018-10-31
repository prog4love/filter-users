import React from 'react';

import * as Utils from '../utils';
import { userPropType } from '../common-prop-types';

const ActiveUser = ({ user }) => {
		const { general, address = {}, contact = {}, job = {} } = user;
		let optClassName = Object.keys(user).length ? '' : 'hide';

		return (
			<div className={Utils.concatClassNames(optClassName, 'panel', 'panel-default')}>
				<div className="active-user-spacer-cover" />
				{general && (
					<div className="panel-heading text-center">
						{general.firstName || ''}
						{general.firstName && general.lastName ? ' ' : ''}
						{general.lastName || ''}
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
						<li className="list-group-item"><b>City:</b> {address.city}</li>
						<li className="list-group-item"><b>Country:</b> {address.country}</li>
						<li className="list-group-item"><b>Street:</b> {address.street}</li>
						<li className="list-group-item"><b>Zip Code:</b> {address.zipCode}</li>
						<hr className="active-user-hr" />
						<li className="list-group-item"><b>Email:</b> {contact.email}</li>
						<li className="list-group-item"><b>Phone:</b> {contact.phone}</li>
						<hr className="active-user-hr" />
						<li className="list-group-item"><b>Company:</b> {job.company}</li>
						<li className="list-group-item"><b>Position:</b> {job.title}</li>
					</ul>
				</div>
				<div className="active-user-spacer-cover" />
			</div>
		);
}

ActiveUser.propTypes = {
	user: userPropType
};

export default ActiveUser;
