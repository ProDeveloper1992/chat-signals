import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';

export function GenderItem({isSelected, imageUrl, size, style, onPress}) {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {
          backgroundColor: isSelected ? colors.primary : colors.white,
          borderColor: isSelected ? colors.white : colors.greydark,
        },
      ]}
      onPress={onPress}>
      <Image
        source={{uri: imageUrl}}
        style={{
          width: size,
          height: size,
          resizeMode: 'contain',
          tintColor: isSelected ? colors.white : colors.primary,
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
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

  onPress: () => {},
};
