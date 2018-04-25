import {
  SELECT_JOB,
  SELECT_CITY,
  SELECT_SALARY,
  LOAD_USERLIST_SUCCESS,
  REFRESH_USERLIST_SUCCESS
} from './actionType';

export interface UserListState {
  selectedJob: Array<string>;
  selectedCity: Array<string>;
  selectedSalary: Array<string>;
  list: Array<object>;
}

const initialUserListState = {
  selectedJob: [],
  selectedCity: [],
  selectedSalary: [],
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
    case LOAD_USERLIST_SUCCESS:
      return { ...state, list: action.list };
    case REFRESH_USERLIST_SUCCESS:
      return { ...state, list: [...state.list, ...action.list] }
    default:
      return state;
  }
};
