import { findChunks } from 'highlight-words-core';

const MAX_NUM_CHARS_DISTANCE = 3;

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

// ensure that distance (in chars) between numeric chars in string not exceeds
// the limit, e.g. 4 and 7 with distance limit of 3 => true,
// 4 and 7 with distance limit of 2 => false
const checkDistanceBetweenNumChars = (maxDistance = 3, originalText) => {
  let satisfyLimit = true;

  if (maxDistance < 1 && process.env.NODE_ENV !== 'production') {
    throw new Error('Expected distance limit to be not less than 1');
  }
  maxDistance = maxDistance < 1 ? 1 : maxDistance;

  originalText.split('').reduce((prevIndex, char, index) => {
    if (!satisfyLimit) {
      return prevIndex;
    }
    if (/[0-9]/.test(char)) {
      satisfyLimit = prevIndex === null
        ? satisfyLimit
        : prevIndex + maxDistance >= index;
      return index;
    } else {
      return prevIndex;
    }
  }, null);

  return satisfyLimit;
};

// generate array of chunks using indexes of matching numeric chars in original
// phone string. Single chunk:
// { start: Number, end: Number }, end index char will be not highlighted
function produceChunksByMatchIndexes(matchIndexes, ) {
  return matchIndexes.reduce((chunks, current, i) => {
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
}

// const uniteChunks = (chunks, numChunks) => {
//   const result = chunks;
//
//   numChunks.forEach(numChunk => {
//     const isNumChunkIncluded = chunks.some(chunk => (
//       chunk.start <= numChunk.start && chunk.end >= numChunk.end
//     ));
//
//     if (!isNumChunkIncluded) {
//       result.push(numChunk);
//     }
//   });
//   return result;
// };

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
  // findChunks - default utility function from "react-highlight-words"
  const chunks = findChunks({
    autoEscape: true,
    caseSensitive: false,
    searchWords,
    textToHighlight,
  });

  // NOTE: if chunk present - do not search for num chunks at all                (1)
  if (chunks.length > 0) {
    console.log('MATCHING CHUNKS: ', chunks);
    return chunks;
  }
  // following code provides kind of fuzzy-like search in phone string:
  // get only numbers from query and compare them to numbers from phone string
  const [query] = searchWords;
  const phoneString = textToHighlight;

  if (!query || !phoneString) {
    return chunks;
  }
  // discard everything except numbers
  const queryNums = query.replace(/\D/g, '');

  if (queryNums === '') {
    return chunks;
  }
  // TODO: save result to external variable to not count again fot each phone
  const fitLimit = checkDistanceBetweenNumChars(MAX_NUM_CHARS_DISTANCE, query);

  if (!fitLimit) {
    return chunks;
  }
  const phoneNums = collectNumericCharIndexes(phoneString);
  const startIndex = phoneNums.str.indexOf(queryNums);

  if (startIndex < 0) {
    return chunks;
  }
  const matchIndexes = phoneNums.indexes.slice(startIndex, startIndex + queryNums.length);
  const numChunks = produceChunksByMatchIndexes(matchIndexes);

  console.log('NUM CHUNKS: ', numChunks);
  // NOTE: after (1) it became unnecessary
  // const finalChunks = uniteChunks(chunks, numChunks);
  return numChunks;
}
