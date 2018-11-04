import { createSelector } from 'reselect';
import { findPhoneMatchingChunks } from './utils';

const QUERY_LENGTH_LIMIT = 30;

export const getUsers = state => state.users;
export const getActiveUserId = state => state.activeUserId;
export const getSearchQuery = state => state.searchQuery;

export const getFilteredUsers = createSelector(
  [getUsers, getSearchQuery],
  (users, searchQuery) => {
    // NOTE: have been already trimmed and lowercased after input
    const query = searchQuery.trim();

    if (query.length > QUERY_LENGTH_LIMIT) {
      console.warn('Search query string length limit was exceeded');
      return users;
    }
    if (query === '') {
      return users;
    }
    return users.filter((user) => {
      return findMatchInUserData(user, query);
    });
  },
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

export const comparePropWithQuery = (propName, propValue, query) => {
  const value = propValue.toLowerCase();
  // console.log(`COMPARE: "${query}" === "${value}" (${propName})`);
  if (propName !== 'phone') {
    return value.includes(query);
  }
  return findPhoneMatchingChunks({
    searchWords: [query],
    textToHighlight: value,
  }).length > 0;
};

export function findMatchInUserData(userData, searchQuery) {
  // NOTE: remember to NOT mutate initial userData objects further
  const query = searchQuery.toLowerCase();
  let hasMatch = false;

  Object.keys(userData).forEach((field) => {
    if (hasMatch) {
      return;
    }
    const fieldProps = userData[field];
    // special case - "id" field
    if (field === 'id') {
      return;
    }
    Object.keys(fieldProps).forEach((prop) => {
      if (hasMatch) {
        return;
      }
      const value = fieldProps[prop];

      // TODO: ensure that value is string
      if (prop === 'avatar' || !value) {
        return;
      }
      hasMatch = comparePropWithQuery(prop, value, query);
      // TEMP:
      if (hasMatch) {
        console.log(`TRUE: "${query}" === "${value}" (${prop})`);
      }
    });
  });
  return hasMatch;
};
