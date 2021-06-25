import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    // height: 70,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  activeTabIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabIcon: function (isFocused) {
    return {
      width: 28,
      height: 28,
      tintColor: isFocused ? Colors.black : Colors.black_30,
    };
  },

  unSeenBadgeContainer: {
    position: 'absolute',
    top: -10,
    right: 15,
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 1
  }
});
