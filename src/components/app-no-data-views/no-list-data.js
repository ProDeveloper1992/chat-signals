import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../../constants';
import { AppText } from '../../components';

export default function NoListData({ title, icon }) {
  return (
    <View style={styles.container}>
      {icon && (
        <View>
          {icon}
        </View>
      )}
      <AppText type={'medium'} color={Colors.greydark} size={18}>
        {title}
      </AppText>
    </View>
  );
}

NoListData.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any
};

NoListData.defaultProps = {
  title: "No data found!",
  icon: false
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
