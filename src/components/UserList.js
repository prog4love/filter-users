import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserData from './UserData';
import ActiveUser from './ActiveUser';
import { userPropType } from '../common-prop-types';
import { selectActiveUser } from '../action-creators';
import { getActiveUser } from '../selectors';

class UserList extends Component {
    render() {
      return (
        <div className="row">
          <div className="active-user-container col-md-4">
            <ActiveUser user={this.props.activeUser} />
          </div>
          <div className="col-md-8">
            <div className="table"> {/* NOTE: was "table-responsive" */}
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    {/* <th>Phone</th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.props.users.map((user) => {
                    return (
                      <UserData
                        key={user.id}
                        user={user}
                        searchQuery={this.props.searchQuery}
                        onSelected={this.props.selectActiveUser.bind(this, user.id)}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(userPropType),
  activeUser: userPropType,
  searchQuery: PropTypes.string,
  selectActiveUser: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    activeUser: getActiveUser(state.users, state.activeUserId),
    searchQuery: state.searchQuery
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
