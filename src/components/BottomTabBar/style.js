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
    top: -wp(1),
    right: wp(4),
    width: wp(4),
    height: wp(4),
    borderRadius: wp(4) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 1
  }
});
