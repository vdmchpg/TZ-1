import { combineReducers } from 'redux';
import user, { LoginAction, LogoutAction } from './user';
import news, { NewsAction } from './news';

const rootReducer = combineReducers({ user, news });


export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = LoginAction & LogoutAction & NewsAction;
export default rootReducer;
