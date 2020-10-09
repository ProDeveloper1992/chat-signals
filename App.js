import React, {Component, useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from './src/redux/store';
import Navigator from './src/navigators';
import AppModals from './src/components/app-modals';
import {View} from 'react-native';

const App = (props) => {
  return (
    <View style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
          <AppModals />
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;
