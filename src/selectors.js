export const getActiveUser = (users, id) => {
  if (!id && id !== 0) {
    return [...users][0] || {};
  }
  return users.filter(d => d.id === id)[0] || {};
};

export const getFilteredUsers = (users, searchQuery) => {
  const compareToQuery = (value, query, propName) => {
    if (propName === 'avatar') {
      return false;
    }
    if (propName !== 'phone' && value.includes(query)) {
      return true;
    }
    if (propName === 'phone') {
      // discard everything except numbers
      const phoneNums = value.replace(/\D/g, '');
      const queryNums = query.replace(/\D/g, '');

      return phoneNums.includes(queryNums);
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

    let hasMatch = false;

    const fieldsToBeLowercased = {
      address: ['city', 'country', 'street'],
      contact: ['email'],
      general: ['firstName', 'lastName'],
      job: ['company', 'title'],
    };
    const lowercasedUser = {};

    // lowercase needed properties and compare all properties to search query
    Object.keys(user).forEach((field) => {
      const currentField = user[field];

      // special case - "id" field
      if (field === 'id') {
        lowercasedUser[field] = currentField;
        return;
      }
      lowercasedUser[field] = {
        ...currentField, // e.g. user['general'] | user['contact']
      };
      const processedField = lowercasedUser[field];

      Object.keys(currentField).forEach((prop) => {
        const shouldLowercase = fieldsToBeLowercased[field].includes(prop);

        if (shouldLowercase) {
          // e.g. lowercasedUser['address']['city']
          processedField[prop] = currentField[prop].toLowerCase();
        }
        hasMatch = compareToQuery(processedField[prop], searchQuery, prop);
      });
    });

    console.log('USER: ', user);
    console.log('LOWESRCASED USER: ', lowercasedUser);

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