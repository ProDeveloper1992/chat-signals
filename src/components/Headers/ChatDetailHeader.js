import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, SafeAreaView } from 'react-native';
import { Colors, Icons } from '../../constants';
import { AppText } from '..';
import Icon from 'react-native-ionicons';
import { ArrowLeftIcon } from '../../constants/svg-icons';

export function ChatDetailHeader({
  style,
  onLeftPress,
  rightIcon,
  onRightPress,
}) {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: Colors.ui_primary }} />
      <View style={[styles.container, style]}>
        <View style={styles.flexOne}>
          <TouchableOpacity onPress={onLeftPress}>
            <ArrowLeftIcon width={30} height={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.flexOne}>
          <AppText type={'bold'} size={16} style={styles.headerTitle}>
            {"Messages"}
          </AppText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={onRightPress}>
            <Image
              style={{
                height: 20,
                width: 20,
                resizeMode: 'contain',
                tintColor: 'white',
              }}
              source={rightIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: Colors.ui_primary,
  },
  flexOne: {
    flex: 1,
  },
  headerTitle: {
    color: 'white',
    letterSpacing: 0.5,
    textAlign: 'center',
    marginLeft: 15,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
