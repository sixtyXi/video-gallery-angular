import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromAuth from '../../core/store/reducers/auth.reducer';

export interface State {
  auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getLoggedIn = createSelector(selectAuthState, fromAuth.getLoggedIn);
export const getUserLogin = createSelector(selectAuthState, fromAuth.getUserLogin);
