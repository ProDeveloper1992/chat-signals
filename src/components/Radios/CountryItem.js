import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';

export function CountryItem({
  isSelected,
  imageUrl,
  countryName,
  size,
  style,
  onPress,
}) {
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
        style={{width: size || 30, height: size || 30, resizeMode: 'contain'}}
      />
      <Text
        style={[
          styles.title,
          {color: isSelected ? colors.white : colors.black},
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
    paddingVertical: 5,
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
    fontSize: 18,
    fontWeight: '700',
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

  onPress: () => {},
};
