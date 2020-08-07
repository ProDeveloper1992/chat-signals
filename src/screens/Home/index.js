import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {AuthContext} from '../../contexts/AuthContext';
import {ThemeContext} from '../../contexts/ThemeContext';
import {IconButton} from '../../components';

export function Home({navigation}) {
  const {logout} = React.useContext(AuthContext);
  const switchTheme = React.useContext(ThemeContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <IconButton
            iconName={'color-palette'}
            onPress={() => {
              switchTheme();
            }}
          />
          <IconButton
            iconName={'log-out'}
            onPress={() => {
              logout();
            }}
          />
        </View>
      ),
    });
  }, [navigation, logout, switchTheme]);

  const products = [
    {name: 'test', price: 'price test', description: 'description test'},
  ];

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
