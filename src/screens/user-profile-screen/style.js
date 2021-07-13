import { StyleSheet } from 'react-native';
import { Colors } from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  cardContainer: {
    margin: 11,
    padding: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(2),
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
    // borderRadius: 5,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
  },
  profileImageContainer: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(20) / 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    backgroundColor: Colors.grey,
    borderRadius: wp(20) / 2,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  commonIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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

  editPenContainer: {
    height: wp(5),
    width: wp(5),
    borderRadius: wp(5) / 2,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: wp(1),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  boostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: wp(10),
    marginVertical: wp(2)
  },

  boostIconContainer: {
    marginBottom: -wp(2),
    marginStart: -wp(2)
  }
});
