import React, { Fragment } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { RootState } from '../../../state/modules';
import { User } from '../../../state/modules/user';

type Props = RouteComponentProps & User;

export const SecuredRoute: React.SFC<Props> = ({ children, username }): JSX.Element => {
  if (username == null) {
    return <Redirect to="/login" noThrow />;
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export const Secured = connect((store: RootState) => store.user)(SecuredRoute);
