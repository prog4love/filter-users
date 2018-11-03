import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Stickyfill from 'stickyfilljs';

import UserData from './UserData';
import ActiveUser from './ActiveUser';
import { userPropType } from '../common-prop-types';
import { selectActiveUser } from '../action-creators';
import { getActiveUser, getSearchQuery } from '../selectors';

class UserList extends Component {
    stickyElement = React.createRef()

    componentDidMount( ) {
      Stickyfill.addOne(this.stickyElement.current);
    }

    render() {
      const { activeUser, users, selectActiveUser } = this.props;

      return (
        <div className="row">
          <div
            ref={this.stickyElement}
            className="active-user-container col-md-4"
          >
            {activeUser && (
              <ActiveUser
                user={activeUser}
                searchQuery={this.props.searchQuery}
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="table"> {/* NOTE: was "table-responsive" */}
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <UserData
                        key={user.id}
                        user={user}
                        activeUserId={activeUser.id}
                        searchQuery={this.props.searchQuery}
                        onSelected={selectActiveUser.bind(this, user.id)}
                      />
                    );
                  })}
                  {users.length < 1 && (
                    <tr className="user-data-tr">
                			<td>{' '}</td>
                			<td style={{ textAlign: 'center' }}>{'Nothing found'}</td>
                			<td>{' '}</td>
                		</tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(userPropType).isRequired,
  activeUser: userPropType,
  searchQuery: PropTypes.string,
  selectActiveUser: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    activeUser: getActiveUser(state),
    searchQuery: getSearchQuery(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectActiveUser(id) {
      dispatch(selectActiveUser(id));
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
