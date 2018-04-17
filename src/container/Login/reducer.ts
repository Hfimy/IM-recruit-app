import { AUTH_SUCCESS } from './actionType';
import { AuthSuccess } from './action';

export interface UserState {
  type?: string;
}

export const UserReducer = (state: UserState = {}, action: AuthSuccess) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        type: action.userType
      };
    default:
      return state;
  }
};
