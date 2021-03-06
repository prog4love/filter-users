import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.scss';

import AppHeader from './components/AppHeader';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import ToolBar from './components/ToolBar';
import { userPropType } from './common-prop-types';
import * as actions from './action-creators';
import { getFilteredUsers } from './selectors';

class App extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  _loadData() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.props.dataUrl);

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          let data = JSON.parse(xhr.response);
          this.props.onDataLoaded(data);
        } catch (err) {
          console.error('JSON.parse error', err);
        }
      }
    }

    xhr.onerror = () => {
      console.error('Data loading error');
    }

    xhr.send();
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <div className="container">
          <SearchBar onSearch={this.props.onSearch} />
          <ToolBar onSort={this.props.sortData} />
          <UserList users={this.props.data} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.arrayOf(userPropType),
  onDataLoaded: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  sortData: PropTypes.func,
  dataUrl: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    data: getFilteredUsers(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onDataLoaded(data) {
      dispatch(actions.updateData(data));
    },
    onSearch(query) {
      dispatch(actions.searchInUserData(query));
    },
    sortData(key, order) {
      dispatch(actions.sortBy(key, order));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
