// import { store } from '../redux/store/store';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from '../navigators/root-navigation'
import { store } from '../redux/store';
import { showToast } from '../redux/actions/app-actions';
import { logoutUser } from '../redux/reducers';
// import io from "socket.io-client";

// export const socket = io("http://13.251.162.218:8080");
// export const socket = io('http://192.168.1.57:8080');

/* switch this for testing on staging or production */
export const staging = true;

export const apiUrlLive = 'http://chat-signal.com/api';
export const apiUrlStaging = 'http://chat-signal.com/api';

export const apiRoot = staging ? apiUrlStaging : apiUrlLive;

export const client = axios.create({
  baseURL: apiRoot,
  timeout: 30000,
  //   headers: { api_key: "JPcopEq16fyQGjnzY3QXVDnGDZrgQAs1" },
});

client.interceptors.request.use(
  async function (config) {
    console.log("config", config.data)
    var basicAuth = store.getState().userState.authToken;
    console.log("Authentication Token... ", basicAuth)
    if (basicAuth && basicAuth != null) {
      config.headers.Authorization = `Bearer ${basicAuth}`;
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
      RootNavigation.navigate('auth-stack');
    }
    return Promise.reject(error);
  },
);
