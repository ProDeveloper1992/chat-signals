import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(4),
  },

  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  activeStatusCircle: {
    position: 'absolute',
    bottom: 0,
    right: wp(1.5)
  },

  userDetailContainer: {
    flex: 1,
    marginLeft: wp(4),
    justifyContent: 'center'
  },

  unSeenBadgeContainer: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(5) / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
