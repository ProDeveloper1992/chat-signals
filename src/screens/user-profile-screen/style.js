import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  imgBackground: {
    height: 350,
    width: '100%',
  },

  hrLine: {
    height: 0.3,
    backgroundColor: 'grey',
  },

  moderatorSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 10,
  },

  moderatorNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  moderatorLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },

  mRight: {
    marginRight: 5,
  },

  flagImage: {
    height: 16,
    width: 16,
    resizeMode: 'cover',
    alignSelf: 'center',
    marginEnd: 5,
  },

  proFlirtContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  moderatorIconViewHolder: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
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
