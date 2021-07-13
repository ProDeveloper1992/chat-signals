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
  },
  //Top Tab Bar
  topTabContainer: {
    backgroundColor: Colors.white,
  },
  topTabIndicator: {
    backgroundColor: Colors.ui_primary,
    height: wp(0.3),
    // borderRadius: 30,
  },
  topTabLabel: {
    fontSize: wp(3),
    fontFamily: getFontFamily('bold'),
    textTransform: 'capitalize',
    paddingVertical: wp(1)
  },
});
