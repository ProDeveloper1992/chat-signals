import {StyleSheet} from 'react-native';
import {Colors} from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  profileImg:{
    height: 50,
    width: 50,
    borderRadius: 8,
    alignSelf: 'center',
    resizeMode: 'cover',
    tintColor:Colors.ui_primary_dark
  },

  userDetailContainer:{
    alignSelf: 'center',
    marginLeft: 15,
  },

  arrowRight:{
    height: 12,
    width: 13,
    resizeMode: 'cover',
    marginTop: 10,
    alignSelf: 'flex-end',
  }
});
