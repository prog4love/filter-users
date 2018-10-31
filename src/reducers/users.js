import { actionTypes as aT } from '../action-creators';

export const users = (state = [], action) => {
  switch (action.type) {
    case aT.UPDATE_DATA:
      return [...action.payload];

    case aT.SORT_BY_NAME:
      return [...state].sort((a, b) => {
        return action.payload.order
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });

    case aT.SORT_BY_AGE:
      return [...state].sort((a, b) => {
        return action.payload.order ? a.age - b.age : b.age - a.age;
      });

    default:
      return state;
  }
};