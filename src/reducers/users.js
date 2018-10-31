import { actionTypes as aT } from '../action-creators';

export const users = (state = [], action) => {
  switch (action.type) {
    case aT.UPDATE_DATA:
      return [...action.payload];

    case aT.SORT_BY_FIRST_NAME:
      return [...state].sort((a, b) => {
        return action.payload.order
          ? a.general.firstName.localeCompare(b.general.firstName)
          : b.general.firstName.localeCompare(a.general.firstName);
      });

    case aT.SORT_BY_LAST_NAME:
      return [...state].sort((a, b) => {
        return action.payload.order
          ? a.general.lastName.localeCompare(b.general.lastName)
          : b.general.lastName.localeCompare(a.general.lastName);
      });

    default:
      return state;
  }
};
