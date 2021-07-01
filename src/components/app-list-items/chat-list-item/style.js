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
    padding: 15,
  },

  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  activeStatusCircle: {
    position: 'absolute',
    bottom: 0,
    right: 5
  },

  userDetailContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center'
  },

  arrowRight: {
    height: 12,
    width: 13,
    resizeMode: 'cover',
    marginTop: 10,
    alignSelf: 'flex-end',
  },

  unSeenBadgeContainer: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
