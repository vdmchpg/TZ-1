import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState, RootAction } from './modules';
import * as API from '../api';

export default createStore(
  rootReducer,
  applyMiddleware(
    thunk.withExtraArgument(API) as ThunkMiddleware<RootState, RootAction, API.API>,
    createLogger(),
  ),
);
