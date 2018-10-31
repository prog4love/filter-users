import { actionTypes as aT } from '../action-creators';

export const searchQuery = (state = '', action) => {
  switch (action.type) {
    case aT.SEARCH_BY_NAME:
      return action.payload;

    default:
      return state;
  }
};