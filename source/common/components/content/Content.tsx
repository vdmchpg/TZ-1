import React from 'react';
import classes from './classes.css';

export const Content: React.SFC = ({ children }): JSX.Element => (
  <main className={classes.root}>
    {children}
  </main>
);
