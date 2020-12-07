// import { store } from '../redux/store/store';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
// import io from "socket.io-client";

// export const socket = io("http://13.251.162.218:8080");
// export const socket = io('http://192.168.1.57:8080');

/* switch this for testing on staging or production */
export const staging = false;

export const apiUrlLive = 'http://chat-signal.com/api';
export const apiUrlStaging = '';

export const apiRoot = staging ? apiUrlStaging : apiUrlLive;

export const client = axios.create({
  baseURL: apiRoot,
  timeout: 30000,
  //   headers: { api_key: "JPcopEq16fyQGjnzY3QXVDnGDZrgQAs1" },
});

client.interceptors.request.use(
  async function (config) {
    // var basicAuth = await AsyncStorage.getItem("userToken");
    // if (basicAuth && basicAuth != null) {
    //   config.headers.Authorization = `Bearer ${basicAuth}`;
    //   //console.log("Token", config.headers.Authorization);
    // } else {
    //   // NavigatorService.navigate("SignIn");
    // }
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
    // return response;
    if (response.data){
     return response.data;
    }
    // if (response.data && response.data.status) return response.data;
    else {
      // if (response.data.message) message = response.data.message;
      return Promise.reject(response);
    }
  },
  function (error) {
    console.log("API Error...", error)

    return Promise.reject(error);
  },
);
