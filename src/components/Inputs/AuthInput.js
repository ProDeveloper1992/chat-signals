import React from 'react';
import { StyleSheet, TextInput, Platform, View } from 'react-native';
import { Colors } from '../../constants';
import { AppText } from '../../components';

export function AuthInput({ style, label, icon, error, ...props }) {
  return (
    <View>
      <View style={styles.labelContainer}>
        {label && (
          <AppText
            type={'regular'}
            size={14}
            color={error ? Colors.ui_error : Colors.black}
            style={styles.label}>
            {label}
          </AppText>
        )}
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderWidth: 0.5,
        borderRadius: 6,
        borderColor: error ? Colors.ui_error : Colors.grey,
      }}>
        {icon}
        <TextInput
          {...props}
          style={[
            styles.input,
            style
          ]}
          placeholderTextColor={Colors.greydark}
          autoCapitalize={'none'}
        />
      </View>
      {error && (
        <AppText
          type={'regular'}
          size={12}
          color={Colors.ui_error}
          style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 4,
  },
  errorText: {
    textAlign: 'right',
  },
  label: {
    paddingTop: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
