import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  backIconContainer:{
    backgroundColor: Colors.black_30,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    height: 30,
    width: 30,
  },

  backIcon: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    tintColor: 'white',
  },

  headerTitle: {
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
