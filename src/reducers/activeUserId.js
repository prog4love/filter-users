import { actionTypes as aT } from '../action-creators';

export const activeUserId = (state = '', action) => {
  switch (action.type) {
    case aT.SELECT_ACTIVE_USER:
      return action.payload.id;

    case aT.UPDATE_DATA:
      return action.payload[0].id;

    default:
      return state;
  }
};