import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from '../../../constants';

export default StyleSheet.create({
  modalContainer: {
    padding: 0,
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalSubContainer: {
    minHeight: '60%',
    backgroundColor: Colors.white,
    borderTopRightRadius: hp(3),
    borderTopLeftRadius: hp(3),
    padding: hp(3),
  },
});
