import nanoid from 'nanoid';

export const actionTypes = {
  UPDATE_DATA: 'UPDATE_DATA',
  SEARCH_BY_NAME: 'SEARCH_BY_NAME',
  SORT_BY_FIRST_NAME: 'SORT_BY_FIRST_NAME',
  SORT_BY_LAST_NAME: 'SORT_BY_LAST_NAME',
  SELECT_ACTIVE_USER: 'SELECT_ACTIVE_USER'
};
const aT = actionTypes;

export const updateData = payload => {
  return {
    type: aT.UPDATE_DATA,
    payload: payload.map(user => ({ id: nanoid(10), ...user })),
  };
};

export const searchByName = payload => {
  return {
    type: aT.SEARCH_BY_NAME,
    payload
  };
};

export const sortBy = (field, order) => {
  // eslint-disable-next-line default-case
  switch (field) {
    case 'firstName':
      return { type: aT.SORT_BY_FIRST_NAME, payload: { order } };
    case 'lastName':
      return { type: aT.SORT_BY_LAST_NAME, payload: { order } };
  }
};

export const selectActiveUser = id => {
  return {
    type: aT.SELECT_ACTIVE_USER,
    payload: { id }
  };
};
