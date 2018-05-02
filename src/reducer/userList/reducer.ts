import {
  SELECT_JOB,
  SELECT_CITY,
  SELECT_SALARY,
  LOAD_USERLIST_SUCCESS,
  REFRESH_USERLIST_SUCCESS,
  SELECT_SENIORITY
} from './actionType';

import { LOGOUT } from 'reducer/user/actionType';

export interface UserListState {
  selectedJob: Array<string>;
  selectedCity: Array<string>;
  selectedSalary: Array<string>;
  selectedSeniority: Array<string>;
  list: Array<object>;
}

const initialUserListState = {
  selectedJob: [],
  selectedCity: [],
  selectedSalary: [],
  selectedSeniority: [],
  list: []
};

export const UserListReducer = (
  state: UserListState = initialUserListState,
  action
) => {
  switch (action.type) {
    case SELECT_JOB:
      return { ...state, selectedJob: action.selectedJob };
    case SELECT_CITY:
      return { ...state, selectedCity: action.selectedCity };
    case SELECT_SALARY:
      return { ...state, selectedSalary: action.selectedSalary };
    case SELECT_SENIORITY:
      return { ...state, selectedSeniority: action.selectedSeniority };
    case LOAD_USERLIST_SUCCESS:
      return { ...state, list: action.list };
    case REFRESH_USERLIST_SUCCESS:
      return { ...state, list: [...state.list, ...action.list] };
    case LOGOUT:
      return initialUserListState;
    default:
      return state;
  }
};
