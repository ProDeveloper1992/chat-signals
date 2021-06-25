import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

import { Colors, DEFAULT_AVATAR_URL, Icons } from '../../constants';
import { AppText } from '../../components';
import styles from './style';
import { getUserProfilePicture } from '../../utils/common';

export default function BottomTabBar({ state, descriptors, navigation }) {

  const { userChatList } = useSelector((state) => state.chatState);

  let unseenMessages = 0;

  if (userChatList.length > 0) {
    for (let chatItem of userChatList) {
      unseenMessages = unseenMessages + chatItem.unseenCounter;
    }
  }

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
            case 'HomeTabStack':
              return Icons.home;

            case 'NotificationTabStack':
              return Icons.notification;

            case 'ChatTabStack':
              return Icons.chat;

            case 'BuyCoinsTabStack':
              return Icons.dollar_circle;

            default:
              return Icons.home;
          }
        };

        const getBadgeCount = () => {
          switch (route.name) {
            case 'HomeTabStack':
              return null;

            case 'NotificationTabStack':
              return null;

            case 'ChatTabStack':
              if (unseenMessages > 0) {
                return <LinearGradient
                  colors={[Colors.ui_counter_badge_gradient_1, Colors.ui_counter_badge_gradient_2]}
                  style={styles.unSeenBadgeContainer}>
                  <AppText
                    type={'bold'}
                    size={11}
                    color={Colors.white}>
                    {unseenMessages}
                  </AppText>
                </LinearGradient>;
              }
              return null;

            case 'BuyCoinsTabStack':
              return null;

            default:
              return null;
          }
        }

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
            {getBadgeCount()}
            {route.name === 'UserProfileTabStack' ? (
              <Image
                source={{ uri: getUserProfilePicture() }}
                style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.grey, borderWidth: 2, borderColor: isFocused ? Colors.black : Colors.white }} />
            ) : (
              <Image style={styles.tabIcon(isFocused)} source={getTabIcon()} />
            )}
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
