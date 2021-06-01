import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import userState from './user-state';
import appState from './app-state';
import flirtsState from './flirts-state';
import appModalState from './app-modals-state';
import bookmarkState from './bookmarks-state';
import chatState from './chat-state';
import { ActionDispatcher } from '../actions';
import * as RootNavigation from '../../navigators/root-navigation'
export const LOGOUT_USER = 'LOGOUT_USER';

const allReducers = combineReducers({
  userState: userState,
  appState: appState,
  appModalState: appModalState,
  flirtsState: flirtsState,
  bookmarkState: bookmarkState,
  chatState: chatState
});

export const logoutUser = () => (dispatch, getState) =>
  new Promise(function (resolve, reject) {
    dispatch(ActionDispatcher(LOGOUT_USER, true));
    resolve(true);
  });

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    console.log("LOGOUT_USER")
    Object.keys(state).forEach((key) => {
      AsyncStorage.removeItem(`persist:${key}`);
    });
    RootNavigation.navigate('auth-stack');
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
