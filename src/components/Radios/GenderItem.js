import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../constants';

export function GenderItem({ isSelected, imageUrl, size, style, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {
          backgroundColor: isSelected ? Colors.ui_primary : Colors.white,
          borderColor: isSelected ? Colors.ui_primary : Colors.ui_primary,
        },
      ]}
      onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: size,
          height: size,
          resizeMode: 'contain',
          tintColor: isSelected ? Colors.white : Colors.ui_primary,
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 5},
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 8,
  },
});

GenderItem.propTypes = {
  imageUrl: PropTypes.string,
  size: PropTypes.any,
  onPress: PropTypes.func,
};

GenderItem.defaultProps = {
  imageUrl: 'https://cdn.countryflags.com/thumbs/india/flag-400.png',
  size: 24,

  onPress: () => { },
};
