import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'yellow'
  },

  imgBackground: {
    height: 350,
    width: '100%',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  flexOne: {
    flex: 1,
  },

  backIcon: {
    height: 25,
    width: 25,
    resizeMode: 'cover',
    tintColor: 'white',
  },

  headerTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  moderatorSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  switchViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  onlineStatusSignal: function (isOnline) {
    return {
      height: 14,
      width: 14,
      borderRadius: 7,
      marginEnd: 5,
      backgroundColor: isOnline ? Colors.green : Colors.red,
      borderWidth: 2,
      borderColor: Colors.white,
    };
  },
});
