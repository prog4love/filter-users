import { createSelector } from 'reselect';
import { findChunks } from 'highlight-words-core';

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

// function findMatchingChunks({
//   autoEscape,
//   caseSensitive,
//   sanitize,
//   searchWords,
//   textToHighlight
// }) {
//   textToHighlight = sanitize(textToHighlight)
//
//   return searchWords
//     .filter(searchWord => searchWord) // Remove empty words
//     .reduce((chunks, searchWord) => {
//       const regex = new RegExp(searchWord, caseSensitive ? 'g' : 'gi')
//
//       let match
//       while ((match = regex.exec(textToHighlight))) {
//         let start = match.index
//         let end = match.lastIndex
//         // We do not return zero-length matches
//         if (end > start) {
//           chunks.push({start, end})
//         }
//       }
//       return chunks
//     }, [])
// }

// it also used as custom findChunks function for Highlighter component
export function findPhoneMatchingChunks({ searchWords, textToHighlight }) {
  if (
    process.env.NODE_ENV !== 'production'
    && (
    typeof textToHighlight !== 'string'
    || !Array.isArray(searchWords)
    || typeof searchWords[0] !== 'string'
  )) {
    throw new Error('Expected array of strings and string params');
  }
  const chunks = findChunks({
    autoEscape: true,
    caseSensitive: false,
    searchWords,
    textToHighlight,
  });
  const [query] = searchWords;
  const phoneString = textToHighlight;

  if (chunks.length > 0) {
    console.log('MATCHING CHUNKS: ', chunks);
  }
  if (!query || !textToHighlight) {
    return chunks;
  }

  // const isNumeric = /^[0-9]*$/.test(query);
  // discard everything except numbers
  // const queryNums = query.replace(/\D/g, '');

  function collectNumericCharIndexes(originalText) {
    return originalText.split('').reduce((collection, char, index) => {
      if (/[0-9]/.test(char)) {
        collection.indexes.push(index);
        collection.str += char;
      }
      return collection;
    }, { indexes: [], str: '' });
  }

  // TODO: add max distance between match chunks

  const phoneNums = collectNumericCharIndexes(phoneString);
  const queryNums = query.replace(/\D/g, '');
  const startIndex = phoneNums.str.indexOf(queryNums);

  if (startIndex < 0) {
    return chunks;
  }
  const matchIndexes = phoneNums.indexes.slice(startIndex, startIndex + queryNums.length);

  const numChunks = matchIndexes.reduce((chunks, current, i) => {
    if (i === 0) {
      chunks.push({ start: current });
    }
    const next = matchIndexes[i + 1];
    const isLast = i === matchIndexes.length - 1;

    if (isLast) {
      // [..., { start: ..., end: current + 1 }]
      chunks[chunks.length - 1].end = current + 1;
      return chunks;
    }
    // e.g. current: 4, next: 7
    if (current + 1 !== next) {
      // [..., { start: ..., end: current + 1 }]
      chunks[chunks.length - 1].end = current + 1;
      // create new chunk
      chunks.push({ start: next  });
    }
    return chunks;
  }, []);

  console.log('NUM CHUNKS: ', numChunks);

  return chunks;
}

export function filterUsers(users, searchQuery) {
  // NOTE: remember to NOT mutate initial users array and user objects further
  const compareToQuery = (propValue, query, propName) => {
    const value = propValue.toLowerCase();

    // console.log(`COMPARE: "${query}" === "${value}" (${propName})`);

    if (propName !== 'phone') {
      return value.includes(query);
    }
    return findPhoneMatchingChunks({
      searchWords: [query],
      textToHighlight: value,
    }).length > 0;
  }
  // NOTE: have been already trimmed and lowercased after input
  searchQuery = searchQuery.trim();

  if (searchQuery.length > QUERY_LENGTH_LIMIT) {
    console.warn('Search query string length limit was exceeded');
    return users;
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
    searchQuery = searchQuery.toLowerCase();

    // compare needed properties to search query
    Object.keys(user).forEach((field) => {
      if (hasMatch) {
        return;
      }
      const fieldProps = user[field];
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
        hasMatch = compareToQuery(value, searchQuery, prop);
        // TEMP:
        if (hasMatch) {
          console.log(`TRUE: "${searchQuery}" === "${fieldProps[prop]}" (${prop})`);
        }
      });
    });
    return hasMatch;
  });

  return filteredUsers;
};
