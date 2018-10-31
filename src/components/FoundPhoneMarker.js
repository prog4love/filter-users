import React from 'react';
import PropTypes from 'prop-types';

// will highlight chars of the phone string that match search query
const FoundPhoneMarker = ({ phone, query }) => {
  const phoneNums = phone.replace(/\D/g, '');
  const queryNums = query.replace(/\D/g, '');

  console.log('phoneNums: %s and queryNums: %s', phoneNums, queryNums);

	if (!queryNums || phoneNums.indexOf(queryNums) < 0) {
    return (
      <span>
        {phone}
      </span>
    );
  }
  // chars left to highlight
  let queryRest = query;
  let parts = [];
  let currentPart; // { string: '', match: false }
  const phoneChars = phone.split('');

  phoneChars.forEach((char, index) => {
    if (!queryRest.length) {
      console.log('queryRest.length is 0');
      return;
    }
    const charIsNumeric = Number.isInteger(Number(char));
    const currentCharMatch = queryRest[0] === char;

    if (charIsNumeric && !currentCharMatch) {
      console.log(`Numeric ${char} at ${index} index is not matching`);
    }

    if (currentCharMatch) {
      queryRest = queryRest.slice(1);
    }

    if (index === 0) {
      currentPart = { string: `${char}`, match: currentCharMatch };
    } else {
      currentPart.string += char;
    }

    if (queryRest.length === 0) {
      parts.push(currentPart);
      parts.push({ string: `${phone.slice(index + 1)}`, match: false });
      return;
    }
    const isLastChar = index === phoneChars.length - 1;

    if (isLastChar) {
      parts.push(currentPart); // { string: 'something', match: true|false }
      return;
    }
    const nextCharMatch = queryRest[0] === phoneChars[index + 1];

    if (!currentCharMatch && nextCharMatch) {
      parts.push(currentPart); // { string: 'something', match: true }
      currentPart = { string: '', match: true };
    }
    if (currentCharMatch && !nextCharMatch) {
      parts.push(currentPart); // { string: 'something', match: false }
      currentPart = { string: '', match: false };
    }
  });

  console.log('parts: ', parts);

  // TEMP: replace keys by unique ids

	return (
		<span>
			{parts.map((part, index) => {
        if (part.match) {
          return (
            <strong key={index} style={{color: '#00D8FF'}}>
              {part.string}
            </strong>
          );
        }
        return part.string;
      })}
		</span>
	);
};

FoundPhoneMarker.propTypes = {
	phone: PropTypes.string.isRequired,
	query: PropTypes.string.isRequired,
};

export default FoundPhoneMarker;

// const collectMatchingChars = (phoneString, query) => {
//   const collectedCharsIndexes = [];
//   const phoneChars = phoneString.split('');
//   let queryRest = query;

//   phoneChars.forEach((char, index) => {
//     if (!queryRest.length) {
//       console.log('queryRest.length is 0');
//       return;
//     }
//     const charIsNumeric = Number.isInteger(Number(char));
//     const currentCharMatch = queryRest[0] === char;

//     if (charIsNumeric && !currentCharMatch) {
//       console.log(`Numeric ${char} at ${index} index is not matching`);
//     }

//     if (currentCharMatch) {
//       queryRest = queryRest.slice(1);
//       collectedCharsIndexes.push(char);
//     }
//     if (index !== 0) {
//       currentPart.string += char;
//     }
//   });

//   return foundCharsIndexes;
// }

// const groupFoundChars = (phoneString, foundCharsIndexes) => {
//   const parts = [];
//   const phoneChars = phoneString.split('');
//   let currentPart; // { string: '', match: false }

//   phoneChars.forEach((char, index) => {
//     const charWasFound = foundCharsIndexes.indexOf(index);
//     if (index === 0) {
//       currentPart = { string: `${char}`, highlight: charWasFound };
//     }
//     const isNextHighlighted = foundCharsIndexes.indexOf(index + 1).
//     if (foundCharsIndexes.indexOf(index)) {

//     }
//   })
// }