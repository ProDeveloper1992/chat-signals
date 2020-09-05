import React from 'react';
import {StyleSheet, TextInput, Platform, View, Text} from 'react-native';
import {Colors} from '../../constants';

export function AuthInput({style, label, error, ...props}) {
  return (
    <View>
      <View style={styles.labelContainer}>
        {label && (
          <Text
            style={[
              styles.label,
              {color: error ? Colors.ui_error : Colors.greydark},
            ]}>
            {label}
          </Text>
        )}
      </View>
      <TextInput
        {...props}
        style={[
          styles.input,
          style,
          {
            backgroundColor: '#fff',
            borderWidth: 0.5,
            borderColor: error ? Colors.ui_error : Colors.primary,
          },
        ]}
        placeholderTextColor={'darkgray'}
      />
      {error && (
        <Text style={[styles.errorText, {color: Colors.ui_error}]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 8,
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  errorText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
