import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },

  profileImageContainer: {
    width: 54,
    height: 54,
    borderRadius: 28,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center'
  },

  activeStatusCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.white,
    backgroundColor: Colors.ui_user_active,
    position: 'absolute',
    bottom: 3,
    right: 0
  },

  profileImg: {
    height: 54,
    width: 54,
    borderRadius: 28,
    alignSelf: 'center',
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
  }
});
