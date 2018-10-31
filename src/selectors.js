export const getActiveUser = (users, id) => {
  if (!id && id !== 0) {
    return [...users][0] || {};
  }
  return users.filter(d => d.id === id)[0] || {};
};

export const getFilteredUsers = (users, searchQuery) => {
  const compareToQuery = (propValue, query, propName) => {
    if (propName === 'avatar') {
      return false;
    }
    const value = propValue.toLowerCase();

    // console.log(`COMPARE: "${query}" === "${value}" (${propName})`);

    if (propName !== 'phone' && value.includes(query)) {
      return true;
    }
    if (propName === 'phone') {
      // discard everything except numbers
      const phoneNums = value.replace(/\D/g, '');
      const queryNums = query.replace(/\D/g, '');

      return queryNums.length > 0 && phoneNums.includes(queryNums);
    }
    return false;
  }
  const filteredUsers = users.filter((user) => {
    // NOTE: remember to NOT mutate initial users object

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

    if (searchQuery === '') {
      return true;
    }
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

    // if (
    //   user.name.toLowerCase().indexOf(searchQuery) >= 0
    //   || `${user.age}`.indexOf(searchQuery) >= 0
    //   || user.phrase.toLowerCase().indexOf(searchQuery) >= 0
    // ) {
    //   return true;
    // }
    // const phoneNums = user.phone.replace(/\D/g, '');
    // const termNums = searchQuery.replace(/\D/g, '');

    // return phoneNums.indexOf(termNums) >= 0;
  });
  return filteredUsers;
};
