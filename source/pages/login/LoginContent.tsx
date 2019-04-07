import React, { useCallback, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../../state/modules/user';
import { RootState } from '../../state/modules';

type DispatchProps = {
  login: typeof UserActions.login;
}
type StoreProps = UserActions.User
type Props = RouteComponentProps & StoreProps & DispatchProps

export const Content: React.SFC<Props> = ({ loading, error, login }): JSX.Element => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    login({ username, password });
  }, [username, password]);

  return (
    <form>
      <h2>Log in</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error.message}</p>}
      <label htmlFor="name">
        Username
        <input
          id="name"
          type="text"
          value={username}
          onChange={e => setUserName(e.target.value)}
          autoComplete="username"
          placeholder="Enter username"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoComplete="current-password"
          placeholder="Enter password"
        />
      </label>
      <button type="submit" onClick={handleSubmit} disabled={loading}>Continue</button>
    </form>
  );
};

export const LoginContent = connect(
  (store: RootState) => store.user,
  dispatch => bindActionCreators({ login: UserActions.login }, dispatch),
)(Content);
