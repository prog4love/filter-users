import { findChunks } from 'highlight-words-core';

export const concatClassNames = (addClassName, ...classNames) => {
	return classNames.concat(addClassName).join(' ');
}

export const getUserImage = (imgName) => {
	if (imgName) {
    const imgSrc = require(`../images/avatars/${imgName}.svg`);
		return imgSrc;
	}
}

export const copy = (source) => {
  if (Array.isArray(source)) {
    return Object.assign({}, ...source);
  } else {
    return Object.assign({}, source);
  }
}

function collectNumericCharIndexes(originalText) {
  return originalText.split('').reduce((collection, char, index) => {
    if (/[0-9]/.test(char)) {
      collection.indexes.push(index);
      collection.str += char;
    }
    return collection;
  }, { indexes: [], str: '' });
}

function checkDistanceBetweenNumChars(maxDistance = 3, originalText) {
  let suitLimit = true;

  originalText.split('').reduce((prevIndex, char, index) => {
    if (!suitLimit) {
      return prevIndex;
    }
    if (/[0-9]/.test(char)) {
      suitLimit = prevIndex === null
        ? suitLimit
        : prevIndex + maxDistance >= index;
      return index;
    } else {
      return prevIndex;
    }
  }, null);

  return suitLimit;
}

// used as custom findChunks function for Highlighter component
// and as helper function in users filtering selector
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
  // TEMP:
  if (chunks.length > 0) {
    console.log('MATCHING CHUNKS: ', chunks);
  }
  if (!query || !textToHighlight) {
    return chunks;
  }
  // const isNumeric = /^[0-9]*$/.test(query);
  // discard everything except numbers
  // const queryNums = query.replace(/\D/g, '');

  // TODO: add max distance limit between num char indexes in query
  const queryNums = query.replace(/\D/g, '');

  if (queryNums === '' || !checkDistanceBetweenNumChars(2, query)) {
    return chunks;
  }
  const phoneNums = collectNumericCharIndexes(phoneString);
  const startIndex = phoneNums.str.indexOf(queryNums);

  if (startIndex < 0) {
    return chunks;
  }
  const matchIndexes = phoneNums.indexes.slice(startIndex, startIndex + queryNums.length);

  // generate array of matching numeric chunks { start: Number, end: Number },
  // where start and end - indexes of chars in original phone string
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
