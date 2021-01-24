import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../constants';
import { AppText } from '..';

export function AppButton({ type, title, icon, style, onPress, loading, disabled }) {
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
        return Colors.transparent;
      case 'facebook':
        return Colors.transparent;
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
        return Colors.black;
      case 'light':
        return Colors.ui_primary;
      case 'google':
        return Colors.greydark;
      case 'facebook':
        return Colors.greydark;
      default:
        return Colors.white;
    }
  }

  const getBorderColor = () => {
    switch (type) {
      case 'primary':
        return Colors.transparent;
      case 'positive':
        return Colors.transparent;
      case 'transparent':
        return Colors.black;
      case 'light':
        return Colors.transparent;
      case 'google':
        return Colors.greydark;
      case 'facebook':
        return Colors.greydark;
      default:
        return Colors.transparent;
    }
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      style={[
        styles.container,
        style,
        {
          opacity: disabled ? 0.5 : 1,
          backgroundColor: getBgColor(),
          borderWidth: 1,
          borderColor: getBorderColor(),
          justifyContent: icon && !loading ? 'space-between' : 'center',
        },
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={'small'} color={getTextColor()} />
      ) : (
          <>
            {icon && icon}
            <AppText type={'medium'} color={getTextColor()} style={{ flex: 1, textAlign: 'center' }} size={14}>
              {title}
            </AppText>
          </>
        )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 43,
  },
});

AppButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf([
    'primary',
    'positive',
    'transparent',
    'light',
    'google',
    'facebook',
  ]),

  style: PropTypes.any,
  onPress: PropTypes.func,
};

AppButton.defaultProps = {
  type: 'primary',
  title: 'Submit',
  loading: false,
  disabled: false,
  onPress: () => { },
};
