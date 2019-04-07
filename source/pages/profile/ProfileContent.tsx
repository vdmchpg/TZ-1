import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';

import classes from './classes.css';
import { User } from '../../state/modules/user';
import { RootState } from '../../state/modules';

type Props = RouteComponentProps & User

export const Content: React.SFC<Props> = ({ username }): JSX.Element => (
  <div className={classes.root}>
    <div className={classes.avatar} />
    <div>
      <p className={classes.field}>
        <span>Username:</span>
        {username}
      </p>
    </div>
  </div>
);

export const ProfileContent = connect(
  (store: RootState): User => store.user,
)(Content);
