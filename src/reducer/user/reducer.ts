import { LOAD_USER_SUCCESS, UPDATE_USER_SUCCESS, LOGOUT } from './actionType';

export interface UserState {
  _id?: string;
  user?: string;
  type?: string;
  intention?: string;
  city?: string;
  leftSalary?: number;
  rightSalary?: number;
  company?: string;
  avatar?: string;
  seniority?: string;
}

export const UserReducer = (state: UserState = {}, action) => {
  switch (action.type) {
    case LOAD_USER_SUCCESS:
      return action.data;
    case UPDATE_USER_SUCCESS:
      return action.data;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
