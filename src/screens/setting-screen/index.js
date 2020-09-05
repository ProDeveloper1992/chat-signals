import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from '../../components';

const Setting = (props) => {
  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <IconButton
            iconName={'log-out'}
            onPress={() => {
              // logout();
            }}
          />
        </View>
      ),
    });
  }, [navigation]);

  const products = [
    {name: 'test', price: 'price test', description: 'description test'},
  ];

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Setting;
