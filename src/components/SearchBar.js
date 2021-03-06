import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class SearchBar extends Component {
		constructor(props) {
			super(props);

			this.handleChange = this.handleChange.bind(this);
			this.cleanField = this.cleanField.bind(this);
		}

		componentDidMount() {
			ReactDOM.findDOMNode(this.refs.searchField).autofocus = true;
		}

		handleChange(event) {
			let searchQuery = event.target.value.trim().toLowerCase();
			this.props.onSearch && this.props.onSearch(searchQuery);
		}

		cleanField() {
			this.refs.searchField.value = '';
			this.props.onSearch && this.props.onSearch('');
		}

		render() {
			let fieldCleanerStyles = {
				position: 'absolute',
				top: 0,
				right: 0,
				padding: '8px 16px',
				color: '#2B3E50',
				outline: 'none'
			};

			return (
				<div className="row">
					<div className="col-md-12">
						<div style={{position: 'relative'}}>
							<input type="text" className="form-control" placeholder="Search by name..."
							ref="searchField" onChange={this.handleChange} />
							<button type="button" className="close search-field-cleaner" style={fieldCleanerStyles}
								onClick={this.cleanField}>
								&times;
							</button>
						</div>
					</div>
				</div>

			);
		}
}

SearchBar.propTypes = {
	onSearch: PropTypes.func
};

export default SearchBar;
