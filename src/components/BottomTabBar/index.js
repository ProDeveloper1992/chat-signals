import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {Colors, Icons} from '../../constants';
import styles from './style';

export default function BottomTabBar({state, descriptors, navigation}) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        // console.log('Route...', route);
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
            // case 'FirstTabStack':
            //   if (isFocused) {
            //     return Icons.home_active;
            //   }
            //   return Icons.home_inactive;

            case 'SecondTabStack':
              if (isFocused) {
                return Icons.group_active;group_active
              }
              return Icons.group_inactive;

            case 'ThirdTabStack':
              if (isFocused) {
                return Icons.chat_active;
              }
              return Icons.chat_inactive;

            case 'FourthTabStack':
              if (isFocused) {
                return Icons.coin_active;
              }
              return Icons.coin_inactive;

            case 'FifthTabStack':
              if (isFocused) {
                return Icons.home_active;
              }
              return Icons.home_inactive;

            default:
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
            <View style={[styles.activeTabIconContainer(isFocused),{borderRadius:20}]}>
              <Image style={styles.tabIcon(isFocused)} source={getTabIcon()} />
            </View>

            <Text style={styles.tabLabel(isFocused)}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
