import {StyleSheet} from 'react-native';
import {Colors} from '../../constants';

export default StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    // height: 70,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },

  activeTabIconContainer: function (isFocused) {
    if (isFocused) {
      return {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: Colors.ui_primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 4,
      };
    } else {
      return {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center',
      };
    }
  },

  tabIcon: function (isFocused) {
    return {
      width: 20,
      height: 20,
      tintColor: isFocused ? Colors.white : Colors.black,
    };
  },

  tabLabel: function (isFocused) {
    if (isFocused) {
      return {
        color: Colors.black,
        fontSize: isFocused ? 13 : 12,
      };
    } else {
      return {
        color: Colors.greydark,
        fontSize: isFocused ? 13 : 12,
      };
    }
  },
});
