import React from 'react';
import { RouteComponentProps } from '@reach/router';

export const HomeContent: React.SFC<RouteComponentProps> = (): JSX.Element => (
  <div>
    <h1>TZ #1, v.2.0</h1>
    <h2>О себе</h2>
    <p>Меня зовут Евгений и я разработчик =)</p>
    <p>
      Два года работаю со стеком React/Redux/React-router.
      На текущем месте работы мы не используем Typescript,
      по этому меня заинтересовало принять участие в данном проекте.
    </p>
    <p>
      Кроме того ранее так же не использовал react-hooks, так как в текущие проекты нет смысла переписывать,
      а в для новых проектов нет уверенности в необходимости этих нововведений.
    </p>
    <h2>Про приложение</h2>
    <ul>
      <li>[x] выполнен базовый функционал</li>
      <li>[x] использованы react-hooks</li>
      <li>[x] использован typescript</li>
      <li>[&nbsp;&nbsp;] оформление</li>
      <li>[&nbsp;&nbsp;] docker</li>
      <li>[x] demo (http://epodivilov.github.io/TZ-1/)</li>
    </ul>
  </div>
);
