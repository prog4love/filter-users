import React from 'react';
import PropTypes from 'prop-types';

import SortByFirstName from './SortByFirstName';
import SortByLastName from './SortByLastName';

const ToolBar = ({ onSort }) => {
	return (
		<div className="row toolbar">
			<div className="col-md-12">
				<div className="pull-right">
					<SortByFirstName onSort={onSort} />
					<SortByLastName onSort={onSort} />
				</div>
			</div>
		</div>
	);
};

ToolBar.propTypes = {
	onSort: PropTypes.func.isRequired
};

export default ToolBar;
