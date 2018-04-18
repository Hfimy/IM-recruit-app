import { LOAD_USER_SUCCESS } from './actionType';

export interface UserState {
  user?: string;
  type?: string;
  intention?: string;
  city?: string;
  payment?: string;
  company?: string;
}

export const UserReducer = (state: UserState = {}, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};
