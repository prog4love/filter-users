import { createSelector } from 'reselect';

const QUERY_LENGTH_LIMIT = 30;

export const getUsers = state => state.users;
export const getActiveUserId = state => state.activeUserId;
export const getSearchQuery = state => state.searchQuery;

export const getFilteredUsers = createSelector(
  [getUsers, getSearchQuery],
  filterUsers,
);

export const getActiveUser = createSelector(
  [getFilteredUsers, getActiveUserId],
  (users, id) => {
    if (users.length < 1) {
      return null;
    }
    if (!id || !users.some(user => user.id === id)) {
      return users.length > 0 ? users[0] : null;
    }
    return users.filter(user => user.id === id)[0];
  },
);

export function filterUsers(users, searchQuery) {
  // NOTE: remember to NOT mutate initial users array and user objects further
  const compareToQuery = (propValue, query, propName) => {
    if (propName === 'avatar') {
      return false;
    }
    const value = propValue.toLowerCase();

    // console.log(`COMPARE: "${query}" === "${value}" (${propName})`);

    if (propName !== 'phone' && value.includes(query)) {
      return true;
    }
    if (propName === 'phone' && query.length < QUERY_LENGTH_LIMIT) {
      const hasOnlyDigits = /^[0-9]*$/.test(query);
      // discard everything except numbers
      const phoneNums = value.replace(/\D/g, '');

      return hasOnlyDigits
        ? phoneNums.includes(query)
        : value.includes(query);
    }
    return false;
  }

  if (searchQuery === '') {
    return users;
  }
  const filteredUsers = users.filter((user) => {
    // address:
    //   city: "New Devon"
    //   country: "Guinea-Bissau"
    //   street: "1520 Zemlak Cove"
    //   zipCode: "42586-7898"

    // contact:
    //   email: "Gerry_Hackett77@gmail.com"
    //   phone: "(895) 984-0132"

    // general:
    //   avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/kevinoh/128.jpg"
    //   firstName: "Liana"
    //   lastName: "Crooks"

    // job:
    //   company: "Ledner, Johnson and Predovic"
    //   title: "Investor Functionality Coordinator"
    let hasMatch = false;

    // NOTE: have been already lowercased and trimmed after input
    const lowercasedQuery = searchQuery.trim().toLowerCase();

    // compare needed properties to search query
    Object.keys(user).forEach((field) => {
      if (hasMatch) {
        return;
      }
      const initialField = user[field];
      // special case - "id" field
      if (field === 'id') {
        return;
      }
      Object.keys(initialField).forEach((prop) => {
        if (hasMatch) {
          return;
        }
        hasMatch = compareToQuery(initialField[prop], lowercasedQuery, prop);
        // TEMP:
        if (hasMatch) {
          console.log(`TRUE: "${searchQuery}" === "${initialField[prop]}" (${prop})`);
        }
      });
    });
    return hasMatch;
  });
  return filteredUsers;
};
