import React from 'react';
import { Router, Redirect } from '@reach/router';

import { Toolbar } from './common/components/toolbar/Toolbar';
import { Content } from './common/components/content/Content';
import { Secured } from './common/components/secured/Secured';

import { HomeContent } from './pages/home/HomeContent';
import { LoginContent } from './pages/login/LoginContent';
import { NewsContent } from './pages/news/NewsContent';
import { ProfileContent } from './pages/profile/ProfileContent';
import { Error } from './pages/error/Error';

const BASE = '/TZ-1';

export const Application = (): JSX.Element => (
  <React.Fragment>
    <Toolbar basepath={BASE} />
    <Content>
      <Router basepath={BASE}>
        <HomeContent path="/" />
        <LoginContent path="login" />
        <Redirect from="news" to={`${BASE}/news/1`} noThrow />
        <NewsContent path="news/:pageId" />
        <Secured path="profile" basepath={BASE}>
          <ProfileContent default />
        </Secured>
        <Error default />
      </Router>
    </Content>
  </React.Fragment>
);
