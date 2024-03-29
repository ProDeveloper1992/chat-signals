/**
 * @format
 */
import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';


// console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

// function HeadlessCheck({ isHeadless }) {
//     if (isHeadless) {
//         // App has been launched in the background by iOS, ignore
//         return null;
//     }

//     return <App />;
// }

// AppRegistry.registerComponent(appName, () => HeadlessCheck);
AppRegistry.registerComponent(appName, () => App);

