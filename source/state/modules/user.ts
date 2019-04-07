import { handleActions } from 'redux-actions';
import { navigate } from '@reach/router';
import { Dispatch } from 'redux';
import { LoginParams, API } from '../../api';
import { RootState } from '.';

export type User = {
  loading: boolean;
  username?: string;
  error?: Error;
}

const initialState: User = {
  username: undefined,
  loading: false,
};

export type LogoutAction =
  | { type: 'user/logout/request' }
  | { type: 'user/logout/resolve' }
  | { type: 'user/logout/reject' }

export const logout = () => async (
  dispatch: Dispatch<LogoutAction>,
  getState: () => RootState,
  api: API,
) => {
  dispatch({ type: 'user/logout/request' });

  try {
    await api.logout();
    dispatch({ type: 'user/logout/resolve' });
  } catch (error) {
    dispatch({ type: 'user/logout/reject' });
  }
};

export type LoginAction =
  | { type: 'user/login/request' }
  | { type: 'user/login/resolve'; payload: Partial<User> }
  | { type: 'user/login/reject'; payload: { error: Error } }

export const login = (params: LoginParams) => async (
  dispatch: Dispatch<LoginAction>,
  getState: () => RootState,
  api: API,
) => {
  dispatch({ type: 'user/login/request' });

  try {
    const user = await api.login(params);
    navigate('/profile');
    dispatch({
      type: 'user/login/resolve',
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: 'user/login/reject',
      payload: { error },
    });
  }
};

export const check = () => async (
  dispatch: Dispatch<LoginAction>,
  getState: () => RootState,
  api: API,
) => {
  dispatch({ type: 'user/login/request' });

  try {
    const user = await api.checkToken();
    dispatch({
      type: 'user/login/resolve',
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: 'user/login/reject',
      payload: { error },
    });
  }
};

export default handleActions({
  'user/login/request': state => ({ ...state, loading: true, error: undefined }),
  'user/login/resolve': (state, { payload }) => ({ ...state, loading: false, ...payload }),
  'user/login/reject': (state, { payload }) => ({ ...state, loading: false, ...payload }),
  'user/logout/request': state => ({ ...state, loading: true, error: undefined }),
  'user/logout/resolve': () => initialState,
  'user/logout/reject': () => initialState,
}, initialState);
