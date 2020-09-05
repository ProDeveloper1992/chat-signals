import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-ionicons';
import PropTypes from 'prop-types';
import {Colors} from '../../constants';

export function GradientButton({type, title, icon, iconColor, style, onPress}) {
  function getBgColor() {
    switch (type) {
      case 'primary':
        return Colors.ui_primary;
      case 'positive':
        return Colors.positive;
      case 'transparent':
        return Colors.transparent;
      case 'light':
        return Colors.white;
      case 'google':
        return Colors.google;
      case 'facebook':
        return Colors.facebook;
      default:
        return Colors.ui_primary;
    }
  }

  function getTextColor() {
    switch (type) {
      case 'primary':
        return Colors.white;
      case 'positive':
        return Colors.white;
      case 'transparent':
        return Colors.ui_primary;
      case 'light':
        return Colors.black;
      case 'google':
        return Colors.white;
      case 'facebook':
        return Colors.white;
      default:
        return Colors.white;
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          backgroundColor: getBgColor(),
          borderWidth: type == 'transparent' ? 1 : 0,
          borderColor:
            type == 'transparent' ? Colors.ui_primary : 'transparent',
          justifyContent: icon ? 'flex-start' : 'center',
        },
      ]}
      onPress={onPress}>
      {icon && (
        <Icon name={icon} color={iconColor} style={{paddingHorizontal: 5}} />
      )}
      <Text style={[styles.text, {color: getTextColor()}]}>
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: Platform.OS === 'ios' ? 15 : 15,
    borderRadius: 8,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});

GradientButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,

  type: PropTypes.oneOf([
    'primary',
    'positive',
    'transparent',
    'light',
    'google',
    'facebook',
  ]),

  iconColor: PropTypes.string,
  style: PropTypes.any,
  onPress: PropTypes.func,
};

GradientButton.defaultProps = {
  type: 'primary',
  title: 'Submit',
  onPress: () => {},
};
