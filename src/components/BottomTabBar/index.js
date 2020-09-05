import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {Colors, Icons} from '../../constants';

export default function BottomTabBar({state, descriptors, navigation}) {
  console.log(state);

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 75,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
      }}>
      {state.routes.map((route, index) => {
        console.log('Route...', route);
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getTabIcon = () => {
          switch (route.name) {
            case 'HomeStack':
              if (isFocused) {
                return Icons.home_active;
              }
              return Icons.home_inactive;

            case 'SettingsStack':
              if (isFocused) {
                return Icons.chat_active;
              }
              return Icons.chat_inactive;

            case 'ProfileStack':
              if (isFocused) {
                return Icons.home_active;
              }
              return Icons.home_inactive;
          }
        };

        return (
          <TouchableOpacity
            key={String(index)}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 45 / 2,
                backgroundColor: isFocused ? Colors.ui_primary : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 5},
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5,
              }}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={getTabIcon()}
              />
            </View>
            <Text
              style={{
                color: isFocused ? Colors.ui_primary_dark : Colors.black,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
