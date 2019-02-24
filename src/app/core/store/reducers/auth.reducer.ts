import { AuthActionTypes, AuthActions } from '../../actions/auth';
import { Person } from 'src/app/shared/models/Person.interface';

export interface AuthState {
  isAuth: boolean;
  user: Person | null;
}

export const initialState = {
  isAuth: false,
  user: null
};

export function reducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        isAuth: true,
        user: action.payload.user
      };
    case AuthActionTypes.LogoutSuccess:
      return initialState;
    default:
      return state;
  }
}

export const getLoggedIn = (state: AuthState) => state.isAuth;
export const getUserLogin = (state: AuthState) => (state.user ? state.user.login : '');
