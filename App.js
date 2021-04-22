import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ActivityIndicator, Alert, View } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import { store, persistor } from './src/redux/store';
import Navigator from './src/navigators';
import AppModals from './src/components/app-modals';
import { configurePushNotification, configureFirebaseNotification } from './src/services/notification-service';
import { AppText } from './src/components';
import { Colors } from './src/constants';

const App = (props) => {

  useEffect(() => {
    launchApp();

    // const unsubscribe = messaging().onMessage(
    //   async (remoteMessage) => {
    //     // alert('A new FCM message arrived!');
    //     console.log(
    //       'A new FCM message arrived!',
    //       JSON.stringify(remoteMessage)
    //     );
    //   }
    // );

    // return unsubscribe;
  }, [])

  const launchApp = () => {
    // configureFirebaseNotification();
    configurePushNotification();
  }

  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <Navigator />
          <AppModals />
        </PersistGate>
      </Provider>
    </View>
  );
};

const Loading = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator color={Colors.ui_primary} size={'large'} />
  </View>
);

export default App;
