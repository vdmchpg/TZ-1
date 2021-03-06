import React, { Fragment } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { RootState } from '../../../state/modules';
import { User } from '../../../state/modules/user';

type Props = RouteComponentProps & User & { basepath?: string }

export const SecuredRoute: React.SFC<Props> = ({ children, username, basepath }): JSX.Element => {
  if (username == null) {
    return <Redirect to={`${basepath}/login`} noThrow />;
  }

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};

export const Secured = connect((store: RootState) => store.user)(SecuredRoute);
