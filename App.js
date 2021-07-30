import React, { Component, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { ActivityIndicator, Alert, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { store, persistor } from './src/redux/store';
import Navigator from './src/navigators';
import AppModals from './src/components/app-modals';
import { configurePushNotification } from './src/services/notification-service';
import { Colors } from './src/constants';

const App = (props) => {

  useEffect(() => {
    launchApp();
    let uniqueId = DeviceInfo.getUniqueId();
    console.log("uniqueId", uniqueId)
  }, [])

  const launchApp = () => {
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
