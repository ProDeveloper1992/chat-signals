import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: Colors.ui_primary,
    borderRadius: 5,
    marginTop: 10
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.grey,
    borderRadius: 8
  },
  buttonWithIcon: function (color) {
    return {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: color,
      borderRadius: 5,
      marginEnd: 5
    }
  },
  smallIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginEnd: 5
  },
  commonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    // tintColor: Colors.white,
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
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Colors.grey,
  },

  tabView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
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
