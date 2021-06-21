import React, { useCallback } from 'react';
import { StyleSheet, TextInput, Platform, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants';
import { AppText } from '../../components';
import { debounce } from "lodash";

export function AuthInput({ style, label, icon, rightIcon, onRightIconPress, error, onChangeText, isDebounce, onDebounceText, ...props }) {

  const handler = useCallback(debounce((text) => onDebounce(text), 1000), []);

  const onChange = (text) => {
    onChangeText(text);
    handler(text);
  }

  const onDebounce = (text) => {
    if (isDebounce) {
      onDebounceText(text);
    }
  }

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
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 15,
        borderColor: error ? Colors.ui_error : Colors.grey,
      }}>
        {icon && (
          <View style={{ marginEnd: 10 }}>
            {icon}
          </View>
        )}
        <TextInput
          {...props}
          style={[
            styles.input,
            style
          ]}
          placeholderTextColor={Colors.greydark}
          autoCapitalize={'none'}
          onChangeText={onChange}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{ padding: 5 }}>
            {rightIcon}
          </TouchableOpacity>
        )}
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
    // paddingHorizontal: 20,
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
    paddingBottom: 5
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
