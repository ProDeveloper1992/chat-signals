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

export function GradientButton({ type, title, icon, style, onPress, loading }) {
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
          justifyContent: icon && !loading ? 'flex-start' : 'center',
        },
      ]}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator size={'small'} color={Colors.white} />
      ) : (
          <>
            {icon && icon}
            <AppText type={'bold'} color={getTextColor()} size={16} uppercase>
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
    padding: Platform.OS === 'ios' ? 15 : 15,
    borderRadius: 8,
  },
});

GradientButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.any,
  loading: PropTypes.bool,
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

GradientButton.defaultProps = {
  type: 'primary',
  title: 'Submit',
  loading: false,
  onPress: () => { },
};
