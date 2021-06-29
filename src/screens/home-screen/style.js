import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import { getFontFamily } from '../../utils/common';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  //Top Tab Bar
  topTabContainer: {
    backgroundColor: Colors.white,
  },
  topTabIndicator: {
    backgroundColor: Colors.ui_primary,
    height: 2,
    // borderRadius: 30,
  },
  topTabLabel: {
    fontSize: hp(2),
    fontFamily: getFontFamily('bold'),
    letterSpacing: 1,
    textTransform: 'capitalize'
  },
});
