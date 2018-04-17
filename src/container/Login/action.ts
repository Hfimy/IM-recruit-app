import { AUTH_SUCCESS } from './actionType';

export interface AuthSuccess {
  type: AUTH_SUCCESS;
  userType: string;
}

export const authSuccess = (data: string): AuthSuccess => ({
  type: AUTH_SUCCESS,
  userType: data
});
