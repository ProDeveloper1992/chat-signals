// import { store } from '../redux/store/store';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../navigators/root-navigation'
import { store } from '../redux/store';
import { showToast } from '../redux/actions/app-actions';
import { logoutUser } from '../redux/reducers';

/* switch this for testing on staging or production */
export const staging = true;

export const apiUrlLive = 'http://chat-signal.com/api';
export const apiUrlStaging = 'http://chat-signal.com/api';

export const apiRoot = staging ? apiUrlStaging : apiUrlLive;

export const client = axios.create({
  baseURL: apiRoot,
  timeout: 30000,
});

client.interceptors.request.use(
  async function (config) {
    // console.log("config", config.data)
    const { authToken } = store.getState().userState;
    console.log("Authentication Token... ", authToken)
    if (authToken && authToken != null) {
      config.headers.Authorization = `Bearer ${authToken}`;
    } else {
      RootNavigation.navigate('auth-stack');
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    console.log("API response...", response)
    if (response.data) {
      return response.data;
    }
    else {
      return Promise.reject(response);
    }
  },
  function (error) {
    console.log("API Error...", error.response)
    if (error.response.status == 401) {
      store.dispatch(showToast('negative', "Session Expired! Login Again!"));
      store.dispatch(logoutUser())
    }
    return Promise.reject(error);
  },
);
