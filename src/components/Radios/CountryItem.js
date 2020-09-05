import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../constants';

export function CountryItem({
  isSelected,
  imageUrl,
  countryName,
  size,
  style,
  onPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {
          backgroundColor: isSelected ? Colors.ui_primary : Colors.white,
          borderColor: isSelected ? Colors.white : Colors.greydark,
        },
      ]}
      onPress={onPress}>
      <Image
        source={{uri: imageUrl}}
        style={{
          width: size,
          height: size,
          resizeMode: 'contain',
          borderRadius: size / 2,
        }}
      />
      <Text
        style={[
          styles.title,
          {color: isSelected ? Colors.white : Colors.black},
        ]}>
        {countryName}
      </Text>
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
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5,
  },
});

CountryItem.propTypes = {
  imageUrl: PropTypes.string,
  countryName: PropTypes.string,
  size: PropTypes.any,
  onPress: PropTypes.func,
};

CountryItem.defaultProps = {
  imageUrl: 'https://cdn.countryflags.com/thumbs/india/flag-400.png',
  countryName: 'IN',
  size: 24,

  onPress: () => {},
};
