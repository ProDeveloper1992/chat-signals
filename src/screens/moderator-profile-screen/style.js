import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },

  imgBackground: {
    height: 300,
    width: '100%',
  },

  hrLine: {
    height: 0.3,
    backgroundColor: 'grey',
  },

  moderatorSwitchContainer: {
    flexDirection: 'row',
    marginStart: 10
  },

  moderatorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  moderatorLocationContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },

  mRight: {
    marginRight: 10,
  },

  flagImage: {
    height: 16,
    width: 16,
    resizeMode: 'cover',
    alignSelf: 'center',
  },

  switchViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  moderatorIconViewHolder: {
    flexDirection: 'row',
    flex: 1,
  },

  tabViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.grey,
  },

  tabView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },

  centerTabView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: Colors.grey,
  },

  onlineStatusSignal: function (isOnline) {
    return {
      height: 12,
      width: 12,
      borderRadius: 6,
      marginStart: 5,
      backgroundColor: isOnline ? Colors.green : Colors.red,
      borderWidth: 2,
      borderColor: Colors.white,
    };
  },
});
