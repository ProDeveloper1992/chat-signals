import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const tabIconSize = Platform.OS == 'ios' ? hp(3.5) : hp(4);
const profileIconSize = Platform.OS == 'ios' ? hp(5.5) : hp(6);

export default StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    // height: 70,
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
    paddingVertical: hp(1.5),
    paddingHorizontal: hp(4),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  tabIcon: function (isFocused) {
    return {
      width: tabIconSize,
      height: tabIconSize,
      tintColor: isFocused ? Colors.black : Colors.black_30,
    };
  },

  profileImage: function (isFocused) {
    return {
      width: profileIconSize,
      height: profileIconSize,
      borderRadius: profileIconSize / 2,
      backgroundColor: Colors.grey,
      borderWidth: 2,
      borderColor: isFocused ? Colors.black : Colors.grey
    }
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
