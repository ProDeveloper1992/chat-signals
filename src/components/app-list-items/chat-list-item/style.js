import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors.grey
  },

  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  activeStatusCircle: function (isActive) {
    return {
      width: 12,
      height: 12,
      borderRadius: 6,
      borderWidth: 2,
      borderColor: Colors.white,
      backgroundColor: isActive ? Colors.ui_user_active : Colors.ui_user_away,
      position: 'absolute',
      bottom: -2,
      right: 0
    }
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
