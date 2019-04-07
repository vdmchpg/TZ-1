import React, { useCallback, Fragment } from 'react';
import { Link } from '@reach/router';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as UserActions from '../../../state/modules/user';
import { RootState } from '../../../state/modules';

import classes from './classes.css';

type StoreProps = UserActions.User
type DispatchProps = {
  logout: typeof UserActions.logout;
}

type Props = StoreProps & DispatchProps & { basepath?: string }

export const Bar: React.SFC<Props> = ({ username, logout, basepath }): JSX.Element => {
  const handleLogout = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    logout();
  }, []);

  return (
    <nav className={classes.root}>
      <Link className={classes.link} to={`${basepath}/`}>Home</Link>
      <Link className={classes.link} to={`${basepath}/news`}>News</Link>
      {
        username == null
          ? <Link className={classes.link} to={`${basepath}/login`}>Login</Link>
          : (
            <Fragment>
              <Link className={classes.link} to={`${basepath}/profile`}>Profile</Link>
              <button type="button" className={classes.link} onClick={handleLogout}>Logout</button>
            </Fragment>
          )
      }
    </nav>
  );
};

export const Toolbar = connect(
  (store: RootState) => store.user,
  dispatch => bindActionCreators({ logout: UserActions.logout }, dispatch),
)(Bar);
