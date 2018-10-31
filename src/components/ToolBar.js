import React from 'react';
import PropTypes from 'prop-types';

import SortByName from './SortByName';
import SortByAge from './SortByAge';

const ToolBar = ({ onSort }) => {
	return (
		<div className="row toolbar">
			<div className="col-md-12">
				<div className="pull-right">
					<SortByName onSort={onSort} />
					<SortByAge onSort={onSort} />
				</div>
			</div>
		</div>
	);
};

ToolBar.propTypes = {
	onSort: PropTypes.func.isRequired
};

export default ToolBar;
