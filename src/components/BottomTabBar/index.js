import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Colors, Icons } from '../../constants';
import { AppText } from '../../components';
import styles from './style';

export default function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        // console.log('Route...', route);
        const { options } = descriptors[route.key];
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
            // case 'FirstTabStack':
            //   if (isFocused) {
            //     return Icons.home_active;
            //   }
            //   return Icons.home_inactive;

            case 'SecondTabStack':
              return Icons.notification;

            case 'ThirdTabStack':
              return Icons.chat;

            case 'FourthTabStack':
              return Icons.dollar_circle;

            case 'FifthTabStack':
              return Icons.profile;

            default:
              return Icons.home;
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
            style={{ flex: 1, alignItems: 'center' }}>
            <Image style={styles.tabIcon(isFocused)} source={getTabIcon()} />

            {/* <AppText
              size={isFocused ? 13 : 12}
              color={isFocused ? Colors.black : Colors.greydark}>
              {label}
            </AppText> */}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
